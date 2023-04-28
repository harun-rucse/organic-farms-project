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
  const user = await userService.createNewUser(_.pick(payload, ['name', 'phone', 'address', 'password', 'image']));

  return user;
};

const login = async (phone, password) => {
  const user = await User.findOne({ phone }).select('+password');
  const isMatch = await user?.correctPassword(password, user.password);

  if (!isMatch) {
    throw new AppError('Incorrect phone or password.', 401);
  }

  return user;
};

const loginOrganization = async (phone, password) => {
  const user = await User.findOne({
    phone,
    role: { $in: ['admin', 'branch-manager', 'office-employee', 'warehouse-employee', 'delivery-person'] },
  }).select('+password');

  const isMatch = await user?.correctPassword(password, user.password);

  if (!isMatch) {
    throw new AppError('Incorrect phone or password.', 401);
  }

  return user;
};

const getProfile = async (id) => {
  const user = await userService.getOneUser({ _id: id });

  const branch = await branchService.getOneBranch({ _id: user.employee[0]?.branchOffice });
  if (!branch) return user;

  return { ...user._doc, branch: { _id: branch._id, name: branch.name, address: branch.address, phone: branch.phone } };
};

module.exports = {
  register,
  login,
  loginOrganization,
  getProfile,
};
