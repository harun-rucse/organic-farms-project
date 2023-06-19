const _ = require('lodash');
const { validateFarmerCard } = require('../models/farmer-card-model');
const farmerCardService = require('../services/farmer-card-service');
const farmerService = require('../services/farmer-service');
const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');

/**
 * @desc    Get all farmer cards
 * @route   GET /api/farmer-cards
 * @access  Private(admin, branch-manager, office-employee)
 */
const getAllFarmerCards = catchAsync(async (req, res, next) => {
  const filter = req.user.role === 'admin' ? {} : { branchOffice: req.user.branchOffice };
  const allFarmerCards = await farmerCardService.getAllFarmerCards(filter, req.query);
  const totalCount = await farmerCardService.getTotalCount(filter);

  res.status(200).json({
    status: 'success',
    total: totalCount,
    result: allFarmerCards,
  });
});

/**
 * @desc    Get single farmer card
 * @route   GET /api/farmer-cards/id
 * @access  Private(admin, branch-manager, office-employee)
 */
const getOneFarmerCard = catchAsync(async (req, res, next) => {
  const filter =
    req.user.role === 'admin' ? { _id: req.params.id } : { _id: req.params.id, branchOffice: req.user.branchOffice };

  const farmerCard = await farmerCardService.getOneFarmerCard(filter);
  if (!farmerCard) return next(new AppError('No farmer card found with this id.', 404));

  res.status(200).json(farmerCard);
});

/**
 * @desc    Create new farmer card
 * @route   POST /api/farmer-cards
 * @access  Private(admin, branch-manager, office-employee)
 */
const createNewFarmerCard = catchAsync(async (req, res, next) => {
  const { error } = validateFarmerCard(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  // Set createdBy to the logged in user
  req.body.createdBy = req.user._id;

  // Set branchOffice to the farmer's branchOffice
  const farmer = await farmerService.getOneFarmer({ _id: req.body.farmer });
  if (!farmer) return next(new AppError('No farmer found with this id.', 404));

  req.body.branchOffice = farmer.branchOffice;

  const payload = _.pick(req.body, ['farmer', 'branchOffice', 'createdBy']);
  const newFarmerCard = await farmerCardService.createNewFarmerCard(payload);

  res.status(201).json(newFarmerCard);
});

/**
 * @desc    Delete single farmer card
 * @route   DELETE /api/farmer-cards/id
 * @access  Private(admin, branch-manager, office-employee)
 */
const deleteOneFarmerCard = catchAsync(async (req, res, next) => {
  const filter =
    req.user.role === 'admin' ? { _id: req.params.id } : { _id: req.params.id, branchOffice: req.user.branchOffice };
  const deleteFarmerCard = await farmerCardService.deleteOneFarmerCard(filter);
  if (!deleteFarmerCard) return next(new AppError('No farmer card found with this id.', 404));

  res.status(204).send();
});

module.exports = {
  getAllFarmerCards,
  getOneFarmerCard,
  createNewFarmerCard,
  deleteOneFarmerCard,
};
