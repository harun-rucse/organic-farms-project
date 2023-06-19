const _ = require('lodash');
const { validateReview, validateReviewUpdate } = require('../models/review-model');
const reviewService = require('../services/review-service');
const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');

/**
 * @desc    Get all reviews
 * @route   GET /api/reviews
 * @access  Private(admin, branch-manager, office-employee)
 */
const getAllReviews = catchAsync(async (req, res, next) => {
  const filter = req.user.role === 'admin' ? {} : { branchOffice: req.user.branchOffice };
  const allReviews = await reviewService.getAllReviews(filter, req.query);
  const totalCount = await reviewService.getTotalCount();

  res.status(200).json({
    status: 'success',
    total: totalCount,
    result: allReviews,
  });
});

/**
 * @desc    Get single review
 * @route   GET /api/reviews/id
 * @access  Private(admin, branch-manager, office-employee)
 */
const getOneReview = catchAsync(async (req, res, next) => {
  const filter =
    req.user.role === 'admin' ? { _id: req.params.id } : { _id: req.params.id, branchOffice: req.user.branchOffice };

  const review = await reviewService.getOneReview(filter);
  if (!review) return next(new AppError('No review found with this id.', 404));

  res.status(200).json(review);
});

/**
 * @desc    Create new review
 * @route   POST /api/reviews
 * @access  Private(customer)
 */
const createNewReview = catchAsync(async (req, res, next) => {
  const { error } = validateReview(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  req.body.user = req.user._id;

  const payload = _.pick(req.body, ['review', 'rating', 'product', 'user']);
  const newReview = await reviewService.createNewReview(payload);

  res.status(201).json(newReview);
});

/**
 * @desc    Update single review
 * @route   PATCH /api/reviews/id
 * @access  Private(customer, admin, branch-manager)
 */
const updateOneReview = catchAsync(async (req, res, next) => {
  const { error } = validateReviewUpdate(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  let filter;
  if (req.user.role === 'admin') {
    filter = { _id: req.params.id };
  } else if (req.user.role === 'branch-manager') {
    filter = { _id: req.params.id, branchOffice: req.user.branchOffice };
  } else {
    filter = { _id: req.params.id, user: req.user._id };
  }

  const payload = _.pick(req.body, ['review', 'rating']);
  const updateReview = await reviewService.updateOneReview(filter, payload);
  if (!updateReview) return next(new AppError('No Review found with this id.', 404));

  res.status(200).json(updateReview);
});

/**
 * @desc    Delete single review
 * @route   DELETE /api/reviews/id
 * @access  Private(customer, admin, branch-manager)
 */
const deleteOneReview = catchAsync(async (req, res, next) => {
  let filter;
  if (req.user.role === 'admin') {
    filter = { _id: req.params.id };
  } else if (req.user.role === 'branch-manager') {
    filter = { _id: req.params.id, branchOffice: req.user.branchOffice };
  } else {
    filter = { _id: req.params.id, user: req.user._id };
  }

  const deleteReview = await reviewService.deleteOneReview(filter);
  if (!deleteReview) return next(new AppError('No review found with this id.', 404));

  res.status(204).send();
});

module.exports = {
  getAllReviews,
  getOneReview,
  createNewReview,
  updateOneReview,
  deleteOneReview,
};
