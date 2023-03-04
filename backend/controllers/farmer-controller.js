const _ = require('lodash');
const { validateFarmer, validateFarmerUpdate } = require('../models/farmer-model');
const farmerService = require('../services/farmer-service');
const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');

/**
 * @desc    Get all farmers
 * @route   GET /api/farmers
 * @access  Private(admin, branch-manager, office-employee)
 */
const getAllFarmers = catchAsync(async (req, res, next) => {
  const filter = req.user.role === 'admin' ? {} : { branchOffice: req.user.branchOffice };
  const allFarmers = await farmerService.getAllFarmers(filter);

  res.status(200).json(allFarmers);
});

/**
 * @desc    Get single farmer
 * @route   GET /api/farmers/id
 * @access  Private(admin, branch-manager, office-employee)
 */
const getOneFarmer = catchAsync(async (req, res, next) => {
  const filter =
    req.user.role === 'admin' ? { _id: req.params.id } : { _id: req.params.id, branchOffice: req.user.branchOffice };

  const farmer = await farmerService.getOneFarmer(filter);
  if (!farmer) return next(new AppError('No farmer found with this id.', 404));

  res.status(200).json(farmer);
});

/**
 * @desc    Create new farmer
 * @route   POST /api/farmers
 * @access  Private(admin, branch-manager, office-employee)
 */
const createNewFarmer = catchAsync(async (req, res, next) => {
  const { error } = validateFarmer(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  // Set createdBy to the logged in user
  req.body.createdBy = req.user._id;

  // Set branchOffice to the logged in user's branchOffice if the logged in user is not an admin
  if (req.user.role !== 'admin') req.body.branchOffice = req.user.branchOffice;

  const payload = _.pick(req.body, [
    'name',
    'address',
    'phone',
    'receivePayment',
    'description',
    'identity',
    'image',
    'branchOffice',
    'createdBy',
  ]);
  const newFarmer = await farmerService.createNewFarmer(payload);

  res.status(201).json(newFarmer);
});

/**
 * @desc    Update single farmer
 * @route   PATCH /api/farmers/id
 * @access  Private(admin, branch-manager, office-employee)
 */
const updateOneFarmer = catchAsync(async (req, res, next) => {
  const { error } = validateFarmerUpdate(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  // Set lastUpdatedBy to the logged in user
  req.body.lastUpdatedBy = req.user._id;
  const filter =
    req.user.role === 'admin' ? { _id: req.params.id } : { _id: req.params.id, branchOffice: req.user.branchOffice };

  const payload = _.pick(req.body, [
    'name',
    'address',
    'phone',
    'receivePayment',
    'description',
    'identity',
    'image',
    'lastUpdatedBy',
  ]);
  const updateFarmer = await farmerService.updateOneFarmer(filter, payload);
  if (!updateFarmer) return next(new AppError('No farmer found with this id.', 404));

  res.status(200).json(updateFarmer);
});

/**
 * @desc    Delete single farmer
 * @route   DELETE /api/farmers/id
 * @access  Private(admin, branch-manager, office-employee)
 */
const deleteOneFarmer = catchAsync(async (req, res, next) => {
  const filter =
    req.user.role === 'admin' ? { _id: req.params.id } : { _id: req.params.id, branchOffice: req.user.branchOffice };
  const deleteFarmer = await farmerService.deleteOneFarmer(filter);
  if (!deleteFarmer) return next(new AppError('No farmer found with this id.', 404));

  res.status(204).send();
});

module.exports = {
  getAllFarmers,
  getOneFarmer,
  createNewFarmer,
  updateOneFarmer,
  deleteOneFarmer,
};
