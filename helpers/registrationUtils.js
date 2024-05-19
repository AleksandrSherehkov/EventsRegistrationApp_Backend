const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

const calculateRegistrationsPerDay = (users, eventId) => {
  const registrations = {};

  users.forEach(user => {
    user.eventIds.forEach(event => {
      if (event.eventId === eventId) {
        const date = event.registrationDate.toISOString().split('T')[0];
        if (!registrations[date]) {
          registrations[date] = 0;
        }
        registrations[date] += 1;
      }
    });
  });

  return registrations;
};

const createChartConfiguration = (labels, data) => {
  const maxRegistrations = Math.max(...data);
  const minRegistrations = Math.min(...data);
  const midThreshold =
    minRegistrations + (maxRegistrations - minRegistrations) / 2;

  const backgroundColors = data.map(value => {
    if (value >= midThreshold) return 'rgba(75, 192, 192, 0.6)';
    if (value > minRegistrations && value < midThreshold)
      return 'rgba(255, 206, 86, 0.6)';
    return 'rgba(255, 99, 132, 0.6)';
  });

  return {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Registrations per Day',
          data,
          backgroundColor: backgroundColors,
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };
};

const generateChartImage = async (labels, data) => {
  const chartJSNodeCanvas = new ChartJSNodeCanvas({ width: 800, height: 200 });
  const configuration = createChartConfiguration(labels, data);
  return await chartJSNodeCanvas.renderToBuffer(configuration);
};

module.exports = {
  calculateRegistrationsPerDay,
  createChartConfiguration,
  generateChartImage,
};
