const Event = require('../models/Event');

const { ctrlWrapper } = require('../decorators');
const { HttpError } = require('../helpers');

const getAll = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 9;
  const filterQuery = req.query.filterQuery || '';
  const startDate = req.query.date ? new Date(req.query.date) : null;
  const endDate = startDate
    ? new Date(new Date(req.query.date).setDate(startDate.getDate() + 1))
    : null;
  const categories = req.query.category ? req.query.category.split(',') : [];
  const sortBy = req.query.sortBy || 'date';
  const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;
  const skip = (page - 1) * limit;

  const filter = {};
  if (filterQuery) {
    filter.$or = [
      { title: { $regex: filterQuery, $options: 'i' } },
      { country: { $regex: filterQuery, $options: 'i' } },
    ];
  }
  if (startDate) {
    filter.date = { $gte: startDate, $lt: endDate };
  }
  if (categories.length > 0) {
    filter.category = { $in: categories };
  }

  const total = await Event.countDocuments(filter);
  const events = await Event.find(filter)
    .sort({ [sortBy]: sortOrder })
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

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Event.findById(id);
  if (!result) {
    throw HttpError(404, `Customer with this id=${id} not found`);
  }
  res.json(result);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Event.create({ ...req.body, owner });
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Event.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Customer with this id=${id} not found`);
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Event.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, `Customer with this id=${id} not found`);
  }
  res.json({ message: 'Delete success' });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
