const { ObjectId } = require('mongoose').Types;
const statisticService = require('../services/statistics-service');
const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');

/**
 * @desc    Get all statistics count
 * @route   GET /api/statistics/count?branch=branchId
 * @access  Private(admin, branch-manager)
 */
const getAllStatsCount = catchAsync(async (req, res, next) => {
  const branch = req.query.branch;
  const month = req.query.month === 'all' ? undefined : req.query.month * 1;
  const filter = {};

  if (branch) filter.branchOffice = branch;
  if (branch === 'all') delete filter.branchOffice;

  if (req.user.role === 'branch-manager') filter.branchOffice = req.user.branchOffice._id;

  if (month && (month < 1 || month > 12)) {
    return next(new AppError('Month should be a number between 1 and 12.', 400));
  }

  const statistics = await statisticService.getAllStatsCount(filter, month);

  res.status(200).json(statistics);
});

/**
 * @desc    Get all statistics amount
 * @route   GET /api/statistics/amount?branch=branchId&month=monthNumber
 * @access  Private(admin, branch-manager)
 */
const getAllStatsAmount = catchAsync(async (req, res, next) => {
  let branch = req.query.branch;
  const month = req.query.month * 1;

  if (req.user.role === 'branch-manager') branch = req.user.branchOffice._id;

  if (!branch) return next(new AppError('branch is required as query', 400));
  if (!req.query.month) return next(new AppError('month is required as query.', 400));
  if (month < 1 || month > 12) {
    return next(new AppError('Month should be a number between 1 and 12.', 400));
  }

  const filter = {
    date: {
      $gte: new Date(new Date().getFullYear(), month - 1, 1),
      $lte: new Date(new Date().getFullYear(), month, 0),
    },
  };

  if (branch === 'all') {
    delete filter.branchOffice;
  } else {
    filter.branchOffice = new ObjectId(branch);
  }

  const statistics = await statisticService.getAllStatsAmount(filter);

  res.status(200).json(statistics);
});

module.exports = {
  getAllStatsCount,
  getAllStatsAmount,
};
