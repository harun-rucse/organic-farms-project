const { Transaction } = require('../models/transaction-model');

const getAllTransactions = (filter = {}) => {
  return Transaction.find(filter);
};

const getOneTransaction = (filter) => {
  return Transaction.findOne(filter);
};

const updateOneTransaction = (filter, payload) => {
  return Transaction.findOneAndUpdate(filter, payload, { new: true });
};

const updateManyTransactions = (filter, payload) => {
  return Transaction.updateMany(filter, payload);
};

module.exports = {
  getAllTransactions,
  getOneTransaction,
  updateOneTransaction,
  updateManyTransactions,
};
