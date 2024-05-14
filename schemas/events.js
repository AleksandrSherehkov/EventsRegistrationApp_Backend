const Joi = require('joi');

const eventAddSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.base': 'title field should be a string',
  }),
  description: Joi.string().required().messages({
    'string.base': 'description field should be a string',
  }),
  date: Joi.date().iso().required().messages({
    'date.base': 'date field should be a date',
    'date.isoDate': 'date field should be in ISO 8601 date format',
  }),
  location: Joi.string().required().messages({
    'string.base': 'location field should be a string',
  }),
});

const eventQuerySchema = Joi.object({
  sortBy: Joi.string()
    .valid('title', 'category', 'country', 'date')
    .default('date'),
  order: Joi.string().valid('asc', 'desc').default('asc'),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(12),
  filterQuery: Joi.string().allow(''),
});

module.exports = {
  eventAddSchema,
  eventQuerySchema,
};
