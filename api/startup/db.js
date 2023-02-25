const mongoose = require('mongoose');
const config = require('../config');

const CONNECTION_URL = config.DATABASE_URL.replace('<password>', config.DATABASE_PASSWORD);

module.exports = () => {
  mongoose.connect(CONNECTION_URL).then(() => console.log('DB connection successful!'));
};
