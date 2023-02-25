const _ = require('lodash');
const { validateBranch, validateBranchUpdate } = require('../models/branch-model');
const branchService = require('../services/branch-service');
const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');

/**
 * @desc    Get all branches
 * @route   GET /api/branches
 * @access  Public
 */
const getAllBranches = catchAsync(async (req, res, next) => {
  const allBranches = await branchService.getAllBranches();

  res.status(200).json(allBranches);
});

/**
 * @desc    Get single branch
 * @route   GET /api/branches/id
 * @access  Public
 */
const getOneBranch = catchAsync(async (req, res, next) => {
  const branch = await branchService.getOneBranch({ _id: req.params.id });
  if (!branch) return next(new AppError('No branch found with this id.', 404));

  res.status(200).json(branch);
});

/**
 * @desc    Create new branch
 * @route   POST /api/branches
 * @access  Privae(admin)
 */
const createNewBranch = catchAsync(async (req, res, next) => {
  const { error } = validateBranch(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  // Set createdBy to the logged in user
  req.body.createdBy = req.user._id;

  const payload = _.pick(req.body, ['name', 'address', 'phone', 'deliveryFee', 'costPercentage', 'createdBy']);
  const newBranch = await branchService.createNewBranch(payload);

  res.status(201).json(newBranch);
});

/**
 * @desc    Update single branch
 * @route   PATCH /api/branches/id
 * @access  Privae(admin)
 */
const updateOneBranch = catchAsync(async (req, res, next) => {
  const { error } = validateBranchUpdate(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  // Set lastUpdatedBy to the logged in user
  req.body.lastUpdatedBy = req.user._id;

  const payload = _.pick(req.body, ['name', 'address', 'phone', 'deliveryFee', 'costPercentage', 'lastUpdatedBy']);
  const updateBranch = await branchService.updateOneBranch({ _id: req.params.id }, payload);
  if (!updateBranch) return next(new AppError('No brabch found with this id.', 404));

  res.status(200).json(updateBranch);
});

/**
 * @desc    Delete single branch
 * @route   PATCH /api/branches/id
 * @access  Privae(admin)
 */
const deleteOneBranch = catchAsync(async (req, res, next) => {
  const deleteBranch = await branchService.deleteOneBranch({ _id: req.params.id });
  if (!deleteBranch) return next(new AppError('No brabch found with this id.', 404));

  res.status(204).send();
});

module.exports = {
  getAllBranches,
  getOneBranch,
  createNewBranch,
  updateOneBranch,
  deleteOneBranch,
};
