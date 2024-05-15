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
  category: Joi.string().required().messages({
    'string.base': 'category field should be a string',
  }),
  country: Joi.string().required().messages({
    'string.base': 'country field should be a string',
  }),
});

const eventQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(9),
  filterQuery: Joi.string().allow(''),
  date: Joi.date().iso().optional(),
});

module.exports = {
  eventAddSchema,
  eventQuerySchema,
};
