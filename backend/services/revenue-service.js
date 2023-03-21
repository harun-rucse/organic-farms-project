const { Revenue } = require('../models/revenue-model');

const getAllRevenues = (filter = {}) => {
  return Revenue.find(filter);
};

const getOneRevenue = (filter) => {
  return Revenue.findOne(filter);
};

const updateOneRevenue = (filter, payload) => {
  return Revenue.findOneAndUpdate(filter, payload, { new: true });
};

const deleteManyRevenues = (filter) => {
  return Revenue.deleteMany(filter);
};

module.exports = {
  getAllRevenues,
  getOneRevenue,
  updateOneRevenue,
  deleteManyRevenues,
};
