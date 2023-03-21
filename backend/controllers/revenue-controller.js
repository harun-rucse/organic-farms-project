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

/**
 * @desc    Get revenue statistics
 * @route   GET /api/revenues/statistics
 * @access  Private(admin, branch-manager)
 */
const getRevenueStatistics = catchAsync(async (req, res, next) => {
  const month = req.query.month * 1;
  if (!req.query.month) return next(new AppError('Please provide a month.', 400));
  if (month < 1 || month > 12) {
    return next(new AppError('Month should be a number between 1 and 12.', 400));
  }

  const filter = {
    date: {
      $gte: new Date(new Date().getFullYear(), month - 1, 1),
      $lte: new Date(new Date().getFullYear(), month, 0),
    },
  };
  if (req.user.role === 'branch-manager') filter.branchOffice = req.user.branchOffice._id;

  const statistics = await revenueService.getRevenueStatistics(filter);

  res.status(200).json(statistics);
});

module.exports = {
  getAllRevenues,
  getOneRevenue,
  getRevenueStatistics,
};
