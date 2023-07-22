const { Salary } = require('../models/salary-model');
const APIFeatures = require('../utils/api-features');

const getTotalCount = (filter) => {
  return Salary.countDocuments(filter);
};

const getAllSalaries = (filter = {}, query = {}) => {
  return new APIFeatures(Salary.find(filter), query).filter().sort().limitFields().paginate().query;
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
  getTotalCount,
  getAllSalaries,
  getOneSalary,
  createNewSalary,
  updateOneSalary,
  deleteOneSalary,
};
