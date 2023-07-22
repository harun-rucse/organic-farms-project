const { Farmer } = require('../models/farmer-model');
const APIFeatures = require('../utils/api-features');

const getTotalCount = (filter) => {
  return Farmer.countDocuments(filter);
};

const getAllFarmers = (filter = {}, query = {}) => {
  return new APIFeatures(Farmer.find(filter), query).filter().sort().limitFields().paginate().query;
};

const getOneFarmer = (filter) => {
  return Farmer.findOne(filter);
};

const createNewFarmer = (payload) => {
  const farmer = new Farmer(payload);

  return farmer.save();
};

const updateOneFarmer = (filter, payload) => {
  return Farmer.findOneAndUpdate(filter, payload, { new: true });
};

const deleteOneFarmer = (filter) => {
  return Farmer.findOneAndDelete(filter);
};

module.exports = {
  getTotalCount,
  getAllFarmers,
  getOneFarmer,
  createNewFarmer,
  updateOneFarmer,
  deleteOneFarmer,
};
