const { Branch } = require('../models/branch-model');
const APIFeatures = require('../utils/api-features');

const getTotalCount = (filter) => {
  return Branch.countDocuments(filter);
};

const getAllBranches = (filter = {}, query) => {
  return new APIFeatures(Branch.find(filter), query).filter().sort().limitFields().paginate().query;
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
  getTotalCount,
  getAllBranches,
  getOneBranch,
  createNewBranch,
  updateOneBranch,
  deleteOneBranch,
};
