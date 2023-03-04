const { Branch } = require('../models/branch-model');

const getAllBranches = () => {
  return Branch.find();
};

const getOneBranch = (filter) => {
  return Branch.findOne(filter);
};

const createNewBranch = (payload) => {
  const branch = new Branch(payload);

  return branch.save();
};

const updateOneBranch = (filter, payload) => {
  return Branch.findOneAndUpdate(filter, payload, { new: true });
};

const deleteOneBranch = (filter) => {
  return Branch.findOneAndDelete(filter);
};

module.exports = {
  getAllBranches,
  getOneBranch,
  createNewBranch,
  updateOneBranch,
  deleteOneBranch,
};
