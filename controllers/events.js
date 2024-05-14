const Event = require('../models/Event');

const { ctrlWrapper } = require('../decorators');

const getAll = async (req, res) => {
  const sortBy = req.query.sortBy || 'date';
  const order = req.query.order || 'asc';
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 12;
  const filterQuery = req.query.filterQuery || '';
  const skip = (page - 1) * limit;

  const filter = {};
  if (filterQuery) {
    filter.$or = [
      { title: { $regex: filterQuery, $options: 'i' } },
      { category: { $regex: filterQuery, $options: 'i' } },
      { country: { $regex: filterQuery, $options: 'i' } },
      { description: { $regex: filterQuery, $options: 'i' } },
    ];
  }

  const total = await Event.countDocuments(filter);
  const events = await Event.find(filter)
    .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
    .skip(skip)
    .limit(limit);

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
