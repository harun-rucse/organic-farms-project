const { Review } = require('../models/review-model');
const APIFeatures = require('../utils/api-features');

const getTotalCount = (filter) => {
  return Review.countDocuments(filter);
};

const getAllReviews = (filter = {}, query) => {
  return new APIFeatures(Review.find(filter), query).filter().sort().limitFields().paginate().query;
};

const getOneReview = (filter) => {
  return Review.findOne(filter);
};

const createNewReview = (payload) => {
  const review = new Review(payload);

  return review.save();
};

const updateOneReview = (filter, payload) => {
  return Review.findOneAndUpdate(filter, payload, { new: true, runValidators: true });
};

const deleteOneReview = (filter) => {
  return Review.findOneAndDelete(filter);
};

module.exports = {
  getTotalCount,
  getAllReviews,
  getOneReview,
  createNewReview,
  updateOneReview,
  deleteOneReview,
};
