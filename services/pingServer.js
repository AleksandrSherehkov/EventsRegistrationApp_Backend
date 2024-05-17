const axios = require('axios');

const pingServer = async () => {
  try {
    await axios.get(
      'https://eventsregistrationapp-backend.onrender.com/api/users/up/ping'
    );
    console.log('Ping successful');
  } catch (error) {
    console.error('Error pinging server:', error.message);
  }
};

module.exports = pingServer;
