const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/../.env` });
const databaseSeeder = require('./database-seeder');

require('../startup/db')();

console.log(`---Seeding to ${process.env.NODE_ENV} database---`);
databaseSeeder.seed();
