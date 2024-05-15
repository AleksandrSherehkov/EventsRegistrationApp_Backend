const { Schema, model } = require('mongoose');

const { handleValidateError, runUpdateValidators } = require('./hooks');

const { customDateValidator } = require('../helpers');
const { emailRegex } = require('../constants/constants');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: emailRegex,
      unique: true,
    },
    birthDate: {
      type: String,
      required: [true, 'Set birthDate for user'],
      validate: {
        validator: value => customDateValidator(value),
        message: 'Invalid birth date or age out of range (18-100 years)',
      },
    },
    referralSource: {
      type: String,
      required: [true, 'Set referralSource for user'],
    },
    eventIds: {
      type: [String],
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);
userSchema.post('save', handleValidateError);
userSchema.pre('findOneAndUpdate', runUpdateValidators);
userSchema.post('findOneAndUpdate', handleValidateError);

const User = model('user', userSchema);

module.exports = User;
