const { Expense } = require('../models/expense-model');

const getAllExpenses = (filter = {}) => {
  return Expense.find(filter);
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
  getAllExpenses,
  getOneExpense,
  createNewExpense,
  updateOneExpense,
};
