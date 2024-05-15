const User = require('../models/User');

const { ctrlWrapper } = require('../decorators');

const getAll = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 15;
  const filterQuery = req.query.filterQuery || '';

  const skip = (page - 1) * limit;

  const filter = {};
  if (filterQuery) {
    filter.$or = [
      { title: { $regex: filterQuery, $options: 'i' } },
      { category: { $regex: filterQuery, $options: 'i' } },
      { country: { $regex: filterQuery, $options: 'i' } },
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
    if (existingUser.eventIds.includes(eventId)) {
      return res
        .status(409)
        .json({ message: 'You are already registered for this event.' });
    } else {
      existingUser.eventIds.push(eventId);
      await existingUser.save();
      return res.status(200).json(existingUser);
    }
  }

  const newUser = new User({
    ...req.body,
    eventIds: [eventId],
  });
  const result = await newUser.save();
  res.status(201).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  add: ctrlWrapper(add),
};
