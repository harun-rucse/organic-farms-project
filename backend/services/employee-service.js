const _ = require('lodash');
const { User } = require('../models/user-model');
const { Employee } = require('../models/employee-model');
const APIFeatures = require('../utils/api-features');

const getTotalCount = (filter) => {
  return Employee.countDocuments(filter);
};

const getAllEmployees = (filter = {}, query) => {
  return new APIFeatures(Employee.find(filter), query).filter().sort().limitFields().paginate().query;
};

const getOneEmployee = (filter) => {
  return Employee.findOne(filter);
};

const createNewEmployee = async (payload) => {
  const user = new User(_.pick(payload, ['name', 'phone', 'address', 'password', 'role', 'image', 'verified']));
  await user.save();

  const { branchOffice, salary, role, createdBy } = payload;
  const employee = new Employee({
    user: user._id,
    branchOffice,
    role,
    salary,
    createdBy,
  });

  // Delete user if employee creation fails
  try {
    await employee.save();
  } catch (error) {
    await User.findByIdAndDelete(user._id);
    throw error;
  }

  // return created employee with created user
  return Employee.findById(employee._id);
};

const updateOneEmployee = async (filter, payload) => {
  const { name, phone, address, role, image, verified, salary, branchOffice, lastUpdatedBy } = payload;

  const employee = await Employee.findOne(filter);
  const user = await User.findOne({ _id: employee.user._id });

  if (name) user.name = name;
  if (phone) user.phone = phone;
  if (address) user.address = address;
  if (role) user.role = role;
  if (image) user.image = image;
  if (verified) user.verified = verified;
  await user.save();

  if (salary) employee.salary = salary;
  if (role) employee.role = role;
  if (branchOffice) employee.branchOffice = branchOffice;
  if (lastUpdatedBy) employee.lastUpdatedBy = lastUpdatedBy;

  // Delete user if employee update fails
  try {
    await employee.save();
  } catch (error) {
    await User.findByIdAndDelete(user._id);
    throw error;
  }

  // return updated employee with updated user
  return Employee.findOne(filter);
};

const deleteOneEmployee = async (filter) => {
  const deletedEmployee = await Employee.findOneAndDelete(filter);
  await User.findOneAndDelete({ _id: deletedEmployee.user._id });

  return deletedEmployee;
};

module.exports = {
  getTotalCount,
  getAllEmployees,
  getOneEmployee,
  createNewEmployee,
  updateOneEmployee,
  deleteOneEmployee,
};
