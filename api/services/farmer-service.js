const { Farmer } = require('../models/farmer-model');

const getAllFarmers = (filter = {}) => {
  return Farmer.find(filter);
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
  getAllFarmers,
  getOneFarmer,
  createNewFarmer,
  updateOneFarmer,
  deleteOneFarmer,
};
