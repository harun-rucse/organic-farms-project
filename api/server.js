const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/.env` });

process.on('uncaughtException', (err) => {
  console.log('ERROR LOG:', err.message);
  console.log('UncaughtException');

  process.exit(1);
});

const app = require('./app');
require('./startup/db')();

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`API is listening on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log('ERROR LOG:', err.message);
  console.log('🔥 UnhandledRejection.Sutting down....');

  server.close(() => {
    process.exit(1);
  });
});
