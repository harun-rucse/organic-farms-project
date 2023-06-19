const { Expense } = require('../models/expense-model');
const APIFeatures = require('../utils/api-features');

const getTotalCount = (filter) => {
  return Expense.countDocuments(filter);
};

const getAllExpenses = (filter = {}, query) => {
  return new APIFeatures(Expense.find(filter), query).filter().sort().limitFields().paginate().query;
};

const getOneExpense = (filter) => {
  return Expense.findOne(filter);
};

const createNewExpense = (payload) => {
  const expense = new Expense(payload);

  return expense.save();
};

const updateOneExpense = (filter, payload) => {
  return Expense.findOneAndUpdate(filter, payload, { new: true });
};

module.exports = {
  getTotalCount,
  getAllExpenses,
  getOneExpense,
  createNewExpense,
  updateOneExpense,
};
