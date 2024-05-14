const { Schema, model } = require('mongoose');

const { handleValidateError, runUpdateValidators } = require('./hooks');

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Set title for event'],
    },
    description: {
      type: String,
      required: [true, 'Set description for event'],
    },
    category: {
      type: String,
      required: [true, 'Set category for event'],
    },
    country: {
      type: String,
      required: [true, 'Set country for event'],
    },

    date: {
      type: Date,
      required: [true, 'Set date for event'],
    },
  },
  { versionKey: false, timestamps: true }
);

eventSchema.post('save', handleValidateError);
eventSchema.pre('findOneAndUpdate', runUpdateValidators);
eventSchema.post('findOneAndUpdate', handleValidateError);

const Event = model('event', eventSchema);

module.exports = Event;
