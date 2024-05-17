# Event Registration API

This is a simple API for managing events and user registrations. The API is
built with Node.js, Express, MongoDB, and Mongoose. It also includes Swagger
documentation for easy API exploration.

## Technologies

- Node.js
- Express
- MongoDB
- Mongoose
- Joi for validation
- Axios for HTTP requests
- Swagger for API documentation
- Morgan for logging
- Cors for enabling Cross-Origin Resource Sharing
- dotenv for environment variable management

## API Documentation

The API documentation is available at:
[Swagger Documentation](https://eventsregistrationapp-backend.onrender.com/api-docs/)

## Getting Started

To get started with this project, follow the steps below:

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:

\`\`\`sh git clone
https://github.com/AleksandrSherehkov/eventsRegistrationApp_Backend.git cd
events-registration-api \`\`\`

2. Install the dependencies:

\`\`\`sh npm install \`\`\`

3. Set up environment variables:

Create a `.env` file in the root directory and add the following variables:

\`\`\` DB_HOST=<your-mongodb-uri> PORT=3000
PREDICT_HQ_API_TOKEN=<your-predicthq-api-token> \`\`\`

4. Start the server:

\`\`\`sh npm start \`\`\`

The server should now be running on `http://localhost:3000`.

### API Endpoints

#### Events

- `GET /api/events`: List all events
- `GET /api/events/:id`: Get an event by ID
- `POST /api/events`: Create a new event
- `PUT /api/events/:id`: Update an event by ID
- `DELETE /api/events/:id`: Delete an event by ID

#### Users

- `GET /api/users`: List all users
- `GET /api/users/event/:eventId`: Get users by event ID
- `POST /api/users`: Create a new user
- `GET /api/users/up/ping`: Ping the server

### Development

For development, you can use `nodemon` to automatically restart the server when
changes are detected:

\`\`\`sh npm run dev \`\`\`

### Linting

This project uses ESLint for code linting. You can run the linter with:

\`\`\`sh npm run lint \`\`\`

## License

This project is licensed under the MIT License.
