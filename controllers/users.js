const User = require('../models/User');

const { ctrlWrapper } = require('../decorators');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

const getAll = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 9;
  const filterQuery = req.query.filterQuery || '';

  const skip = (page - 1) * limit;

  const filter = {};
  if (filterQuery) {
    filter.$or = [{ name: { $regex: filterQuery, $options: 'i' } }];
  }

  const total = await User.countDocuments(filter);
  const users = await User.find(filter).skip(skip).limit(limit);

  res.json({
    total,
    page,
    pages: Math.ceil(total / limit),
    limit,
    data: users,
  });
};

const getByEventId = async (req, res) => {
  const { eventId } = req.params;
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 9;
  const filterQuery = req.query.filterQuery || '';

  const skip = (page - 1) * limit;

  const filter = { eventIds: { $elemMatch: { eventId: eventId } } };
  if (filterQuery) {
    filter.$or = [
      { name: { $regex: filterQuery, $options: 'i' } },
      { email: { $regex: filterQuery, $options: 'i' } },
    ];
  }

  const total = await User.countDocuments(filter);
  const users = await User.find(filter).skip(skip).limit(limit);

  res.json({
    total,
    page,
    pages: Math.ceil(total / limit),
    limit,
    data: users,
  });
};

const add = async (req, res) => {
  const { email, eventId } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const eventExists = existingUser.eventIds.some(
      event => event.eventId === eventId
    );
    if (eventExists) {
      return res
        .status(409)
        .json({ message: 'You are already registered for this event.' });
    } else {
      existingUser.eventIds.push({ eventId, registrationDate: new Date() });
      await existingUser.save();
      return res.status(200).json(existingUser);
    }
  }

  const newUser = new User({
    ...req.body,
    eventIds: [{ eventId, registrationDate: new Date() }],
  });
  const result = await newUser.save();
  res.status(201).json(result);
};

const registrationsPerDay = async (req, res) => {
  const { eventId } = req.params;

  const users = await User.find({ 'eventIds.eventId': eventId });
  const registrations = {};

  users.forEach(user => {
    user.eventIds.forEach(event => {
      if (event.eventId === eventId) {
        const date = event.registrationDate.toISOString().split('T')[0];
        if (!registrations[date]) {
          registrations[date] = 0;
        }
        registrations[date] += 1;
      }
    });
  });

  const labels = Object.keys(registrations).sort();
  const data = labels.map(date => registrations[date]);

  const chartJSNodeCanvas = new ChartJSNodeCanvas({ width: 800, height: 600 });
  const configuration = {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Registrations per Day',
          data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    },
  };

  const image = await chartJSNodeCanvas.renderToBuffer(configuration);
  res.set('Content-Type', 'image/png');
  res.send(image);
};

const getPing = async (_, res) => {
  res.status(200).json({ message: 'Server is alive' });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  add: ctrlWrapper(add),
  getByEventId: ctrlWrapper(getByEventId),
  getPing: ctrlWrapper(getPing),
  registrationsPerDay: ctrlWrapper(registrationsPerDay),
};
