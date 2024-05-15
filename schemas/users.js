const Joi = require('joi');
const { emailRegex } = require('../constants/constants');
const { customDateValidator } = require('../helpers');

const userSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'name field should be a string',
  }),
  email: Joi.string().pattern(emailRegex).optional().messages({
    'string.base': 'Email field must be a string',
    'string.pattern.base': 'Invalid email format',
  }),
  birthDate: Joi.string().required().custom(customDateValidator).messages({
    'any.invalid':
      'Date of birth must be in the format dd-MM-yyyy and age should be between 18 and 100 years',
  }),
  referralSource: Joi.string().required().messages({
    'string.base': 'referralSource field should be a string',
  }),
  eventId: Joi.string().required().messages({
    'string.base': 'eventId field should be a string',
  }),
});

const userQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(9),
  filterQuery: Joi.string().allow(''),
});

module.exports = {
  userSchema,
  userQuerySchema,
};
