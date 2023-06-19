const _ = require('lodash');
const { validateExpense, validateExpenseUpdate } = require('../models/expense-model');
const expenseService = require('../services/expense-service');
const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');

/**
 * @desc    Get all expenses
 * @route   GET /api/expenses
 * @access  Private(admin, branch-manager)
 */
const getAllExpenses = catchAsync(async (req, res, next) => {
  const filter = req.user.role === 'admin' ? {} : { branchOffice: req.user.branchOffice };
  const allExpenses = await expenseService.getAllExpenses(filter, req.query);
  const totalCount = await expenseService.getTotalCount();

  res.status(200).json({
    status: 'success',
    total: totalCount,
    result: allExpenses,
  });
});

/**
 * @desc    Get single expense
 * @route   GET /api/expenses/id
 * @access  Private(admin, branch-manager)
 */
const getOneExpense = catchAsync(async (req, res, next) => {
  const filter =
    req.user.role === 'admin' ? { _id: req.params.id } : { _id: req.params.id, branchOffice: req.user.branchOffice };

  const expense = await expenseService.getOneExpense(filter);
  if (!expense) return next(new AppError('No expense found with this id.', 404));

  res.status(200).json(expense);
});

/**
 * @desc    Create new expense
 * @route   POST /api/expenses
 * @access  Private(admin, branch-manager)
 */
const createNewExpense = catchAsync(async (req, res, next) => {
  const { error } = validateExpense(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  // Set createdBy to the logged in user
  req.body.createdBy = req.user._id;

  // Set branchOffice to the logged in user's branchOffice if the logged in user is not an admin
  if (req.user.role !== 'admin') req.body.branchOffice = req.user.branchOffice;

  const payload = _.pick(req.body, ['category', 'amount', 'description', 'date', 'branchOffice', 'createdBy']);
  const newExpense = await expenseService.createNewExpense(payload);

  res.status(201).json(newExpense);
});

/**
 * @desc    Update single expense
 * @route   PATCH /api/expenses/id
 * @access  Private(admin, branch-manager)
 */
const updateOneExpense = catchAsync(async (req, res, next) => {
  const { error } = validateExpenseUpdate(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  // Set lastUpdatedBy to the logged in user
  req.body.lastUpdatedBy = req.user._id;
  const filter =
    req.user.role === 'admin' ? { _id: req.params.id } : { _id: req.params.id, branchOffice: req.user.branchOffice };

  const payload = _.pick(req.body, ['category', 'amount', 'description', 'date', 'lastUpdatedBy']);
  const updateExpense = await expenseService.updateOneExpense(filter, payload);
  if (!updateExpense) return next(new AppError('No expense found with this id.', 404));

  res.status(200).json(updateExpense);
});

module.exports = {
  getAllExpenses,
  getOneExpense,
  createNewExpense,
  updateOneExpense,
};
