const _ = require('lodash');
const { User } = require('../models/user-model');
const AppError = require('../utils/app-error');
const userService = require('./user-service');

const register = async (payload) => {
  // check if phone is already exists
  const isExists = await userService.getOneUser({ phone: payload.phone });
  if (isExists) {
    throw new AppError('Phone is already exists.', 400);
  }

  // Save to the database
  const user = await userService.createNewUser(_.pick(payload, ['name', 'phone', 'address', 'password']));

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

module.exports = {
  register,
  login,
};
