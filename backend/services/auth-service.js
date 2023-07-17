const _ = require('lodash');
const { User } = require('../models/user-model');
const AppError = require('../utils/app-error');
const userService = require('./user-service');
const branchService = require('./branch-service');

const register = async (payload) => {
  // check if phone is already exists
  const isExists = await userService.getOneUser({ phone: payload.phone });
  if (isExists) {
    throw new AppError('Phone is already exists.', 400);
  }

  // Save to the database
  const user = await userService.createNewUser(payload);

  return user;
};

const login = async (phone, password) => {
  const user = await User.findOne({ phone, role: 'customer' }).select('+password');
  const isMatch = await user?.correctPassword(password, user.password);

  if (!isMatch) {
    throw new AppError('Incorrect phone or password.', 401);
  }

  return user;
};

const loginOrganization = async (phone, password) => {
  const user = await User.findOne({
    phone,
    role: { $in: ['admin', 'branch-manager', 'office-employee', 'warehouse-employee'] },
  }).select('+password');

  const isMatch = await user?.correctPassword(password, user.password);

  if (!isMatch) {
    throw new AppError('Incorrect phone or password.', 401);
  }

  if (!user.verified) {
    throw new AppError('Your account is not verified.', 401);
  }

  return user;
};

const getProfile = async (id) => {
  const user = await userService.getOneUser({ _id: id });

  const branch = await branchService.getOneBranch({ _id: user.employee[0]?.branchOffice });
  if (!branch) return user;

  return { ...user._doc, branch: { _id: branch._id, name: branch.name, address: branch.address, phone: branch.phone } };
};

const updateProfile = async (id, payload) => {
  const user = await userService.updateOneUser({ _id: id }, payload);

  return user;
};

module.exports = {
  register,
  login,
  loginOrganization,
  getProfile,
  updateProfile,
};
