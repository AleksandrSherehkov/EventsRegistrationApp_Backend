const Event = require('../models/Event');

const { ctrlWrapper } = require('../decorators');

const getAll = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 12;
  const filterQuery = req.query.filterQuery || '';
  const startDate = req.query.date ? new Date(req.query.date) : null;
  const skip = (page - 1) * limit;

  const filter = {};
  if (filterQuery) {
    filter.$or = [
      { title: { $regex: filterQuery, $options: 'i' } },
      { category: { $regex: filterQuery, $options: 'i' } },
      { country: { $regex: filterQuery, $options: 'i' } },
    ];
  }
  if (startDate) {
    filter.date = { $gte: startDate };
  }

  const total = await Event.countDocuments(filter);
  const events = await Event.find(filter).skip(skip).limit(limit);

  res.json({
    total,
    page,
    pages: Math.ceil(total / limit),
    limit,
    data: events,
  });
};

const add = async (req, res) => {
  const newEvent = await Event.create(req.body);
  res.status(201).json(newEvent);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  add: ctrlWrapper(add),
};
