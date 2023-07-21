const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

module.exports = () => {
  return mongoose.connect(process.env.DATABASE_URL);
};
