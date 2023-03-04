const dotenv = require('dotenv');
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const db = require('../startup/db');
const databaseSeeder = require('./database-seeder');

// require('../startup/db')();
// connec to database then seed

db().then(() => {
  console.log('DB connection successful!');
  console.log(`---Seeding to ${process.env.NODE_ENV} database---`);
  databaseSeeder.seed();
});
