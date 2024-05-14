const axios = require('axios');
const Event = require('../models/Event');
require('dotenv').config();

const fetchEvents = async () => {
  try {
    let nextUrl = 'https://api.predicthq.com/v1/events/?limit=50';
    while (nextUrl) {
      const response = await axios.get(nextUrl, {
        headers: {
          Authorization: `Bearer ${process.env.PREDICT_HQ_API_TOKEN}`,
        },
      });

      const events = response.data.results;
      for (const event of events) {
        const existingEvent = await Event.findOne({
          title: event.title,
          date: event.start,
        });
        if (!existingEvent) {
          await Event.create({
            title: event.title,
            description: event.description || 'No description provided',
            category: event.category,
            country: event.country,
            date: event.start,
          });
        }
      }

      nextUrl = response.data.next;
    }
  } catch (error) {
    console.error('Error fetching events:', error.message);
  }
};

module.exports = fetchEvents;
