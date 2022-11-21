const path = require('path');
const express = require('express');
const app = express();
require('express-async-errors');

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));

// Db
const connectDb = require('./db/main-db');
connectDb();

// Middlewares
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

// Routes
const admin = require('./routes/admin-route');

app.use(express.json({ limit: '1mb' }));
app.use('/assets', express.static(path.resolve(__dirname, 'client/dist/assets/')));
app.use('/static', express.static(path.resolve(__dirname, 'client/dist/static/')));

// Home
app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, 'client/dist/index.html')));

// Admin route
app.use('/admin', admin);

// All routes
app.all('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client/dist/404/index.html')));

app.use(notFound);
app.use(errorHandler);

// Handling Error
process.on("unhandledRejection", err => {
  console.log(`An error occurred: ${err.message}`)
  server.close(() => process.exit(1))
});