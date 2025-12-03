const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const routes = require('./routes/logs');
const { logger } = require('./utils/logger');
const { errorHandler } = require('./middlewares/errorHandler');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => logger.info('Connected to MongoDB'))
.catch(err => {
  logger.error('MongoDB connection error:', err);
  process.exit(1); // Exit process on fatal error
});


app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

app.use('/logs', routes);

app.use(errorHandler);

const server = app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled rejection:', err);
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    logger.error('Uncaught exception:', err);
    server.close(() => process.exit(1));
});