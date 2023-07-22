const { FarmerCard } = require('../models/farmer-card-model');
const APIFeatures = require('../utils/api-features');

const getTotalCount = (filter) => {
  return FarmerCard.countDocuments(filter);
};

const getAllFarmerCards = (filter = {}, query = {}) => {
  return new APIFeatures(FarmerCard.find(filter), query).filter().sort().limitFields().paginate().query;
};

const getOneFarmerCard = (filter) => {
  return FarmerCard.findOne(filter);
};

const createNewFarmerCard = (payload) => {
  const farmerCard = new FarmerCard(payload);

  return farmerCard.save();
};

const deleteOneFarmerCard = (filter) => {
  return FarmerCard.findOneAndDelete(filter);
};

module.exports = {
  getTotalCount,
  getAllFarmerCards,
  getOneFarmerCard,
  createNewFarmerCard,
  deleteOneFarmerCard,
};
