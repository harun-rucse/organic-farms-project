const { Review } = require('../models/review-model');

const getAllReviews = (filter = {}) => {
  return Review.find(filter);
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
  getAllReviews,
  getOneReview,
  createNewReview,
  updateOneReview,
  deleteOneReview,
};
