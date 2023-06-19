const { User } = require('../models/user-model');
const APIFeatures = require('../utils/api-features');

const getTotalCount = (filter) => {
  return User.countDocuments(filter);
};

const getAllUsers = (filter = {}, query) => {
  return new APIFeatures(User.find(filter), query).filter().sort().limitFields().paginate().query;
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
  getTotalCount,
  getAllUsers,
  getOneUser,
  createNewUser,
  updateOneUser,
  deleteOneUser,
};
