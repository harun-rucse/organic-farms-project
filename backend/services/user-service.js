const { User } = require('../models/user-model');

const getAllUsers = () => {
  return User.find();
};

const getOneUser = (filter) => {
  return User.findOne(filter);
};

const createNewUser = (payload) => {
  const user = new User(payload);

  return user.save();
};

const updateOneUser = (filter, payload) => {
  return User.findOneAndUpdate(filter, payload, { new: true });
};

const deleteOneUser = (filter) => {
  return User.findOneAndDelete(filter);
};

module.exports = {
  getAllUsers,
  getOneUser,
  createNewUser,
  updateOneUser,
  deleteOneUser,
};
