const { FarmerCard } = require('../models/farmer-card-model');

const getAllFarmerCards = (filter = {}) => {
  return FarmerCard.find(filter);
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
  getAllFarmerCards,
  getOneFarmerCard,
  createNewFarmerCard,
  deleteOneFarmerCard,
};
