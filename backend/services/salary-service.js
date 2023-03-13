const { Salary } = require('../models/salary-model');

const getAllSalaries = (filter = {}) => {
  return Salary.find(filter);
};

const getOneSalary = (filter) => {
  return Salary.findOne(filter);
};

const createNewSalary = (payload) => {
  const salary = new Salary(payload);

  return salary.save();
};

const updateOneSalary = (filter, payload) => {
  return Salary.findOneAndUpdate(filter, payload, { new: true, runValidators: true });
};

const deleteOneSalary = (filter) => {
  return Salary.findOneAndDelete(filter);
};

module.exports = {
  getAllSalaries,
  getOneSalary,
  createNewSalary,
  updateOneSalary,
  deleteOneSalary,
};
