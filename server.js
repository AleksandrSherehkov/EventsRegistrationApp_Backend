const mongoose = require('mongoose');

const app = require('./app');
const fetchEvents = require('./services/fetchEvents');
const pingServer = require('./services/pingServer');

const { DB_HOST, PORT } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });

    setInterval(fetchEvents, 6 * 60 * 60 * 1000);
    fetchEvents();

    setInterval(pingServer, 19 * 60 * 1000);
    pingServer();
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
