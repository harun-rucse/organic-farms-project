const revenueService = require('../services/revenue-service');
const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');

/**
 * @desc    Get all revenues
 * @route   GET /api/revenues
 * @access  Private(admin, branch-manager)
 */
const getAllRevenues = catchAsync(async (req, res, next) => {
  const filter = req.user.role === 'admin' ? {} : { branchOffice: req.user.branchOffice };
  const allRevenues = await revenueService.getAllRevenues(filter);

  res.status(200).json(allRevenues);
});

/**
 * @desc    Get single revenue
 * @route   GET /api/revenues/id
 * @access  Private(admin, branch-manager)
 */
const getOneRevenue = catchAsync(async (req, res, next) => {
  const filter =
    req.user.role === 'admin' ? { _id: req.params.id } : { _id: req.params.id, branchOffice: req.user.branchOffice };

  const revenue = await revenueService.getOneRevenue(filter);
  if (!revenue) return next(new AppError('No revenue found with this id.', 404));

  res.status(200).json(revenue);
});

module.exports = {
  getAllRevenues,
  getOneRevenue,
};
