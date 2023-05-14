const dotenv = require('dotenv');
const logger = require('./logger');
dotenv.config({ path: `${__dirname}/.env.${process.env.NODE_ENV}` });

process.on('uncaughtException', () => {
  logger.on('error', () => {
    process.exit(1);
  });
});

const app = require('./app');
const db = require('./startup/db');

db().then(() => {
  logger.info('DB connection successful!');
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  logger.info(`API is listening in [${process.env.NODE_ENV}] on port ${PORT}`);
});

process.on('unhandledRejection', () => {
  logger.on('error', () => {
    server.close(() => {
      process.exit(1);
    });
  });
});
