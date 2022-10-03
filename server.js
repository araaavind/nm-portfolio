require('express-async-errors');
const path = require('path');
const express = require('express');
const app = express();

// Db
const connectDb = require('./db/main-db');
connectDb();

// Middlewares
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

// Routes
const admin = require('./routes/admin-route');

app.use(express.json({ limit: '1mb' }));

app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '../client/dist/index.html')));
app.use('/admin', admin);
// app.all('*', );

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
  } catch (error) {
    console.error(error);
  }
}
start();

// Handling Error
process.on("unhandledRejection", err => {
  console.log(`An error occurred: ${err.message}`)
  server.close(() => process.exit(1))
});