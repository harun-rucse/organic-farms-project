const _ = require('lodash');
const { validateTransactionUpdate } = require('../models/transaction-model');
const transactionService = require('../services/transaction-service');
const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');

/**
 * @desc    Get all transactions
 * @route   GET /api/transactions
 * @access  Private(admin, branch-manager, warehouse-employee)
 */
const getAllTransactions = catchAsync(async (req, res, next) => {
  const filter = req.user.role === 'admin' ? {} : { branchOffice: req.user.branchOffice };
  const allTransactions = await transactionService.getAllTransactions(filter);

  res.status(200).json(allTransactions);
});

/**
 * @desc    Get single transaction
 * @route   GET /api/transactions/id
 * @access  Private(admin, branch-manager)
 */
const getOneTransaction = catchAsync(async (req, res, next) => {
  const filter =
    req.user.role === 'admin' ? { _id: req.params.id } : { _id: req.params.id, branchOffice: req.user.branchOffice };

  const transaction = await transactionService.getOneTransaction(filter);
  if (!transaction) return next(new AppError('No transaction found with this id.', 404));

  res.status(200).json(transaction);
});

/**
 * @desc    Update single transaction
 * @route   PATCH /api/transactions/id
 * @access  Private(admin, branch-manager)
 */
const updateOneTransaction = catchAsync(async (req, res, next) => {
  const { error } = validateTransactionUpdate(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  // Check transaction status
  const transaction = await transactionService.getOneTransaction({ _id: req.params.id, status: 'Completed' });
  if (!transaction) return next(new AppError('Transaction is not Completed yet!', 400));

  const trx = await transactionService.getOneTransaction({ _id: req.params.id, paymentStatus: 'Paid' });
  if (trx) return next(new AppError('Already paid for this transaction!', 400));

  // Set lastUpdatedBy to the logged in user
  req.body.lastUpdatedBy = req.user._id;
  const filter =
    req.user.role === 'admin' ? { _id: req.params.id } : { _id: req.params.id, branchOffice: req.user.branchOffice };

  const payload = _.pick(req.body, ['trxId', 'paymentStatus', 'lastUpdatedBy']);
  const updateTransaction = await transactionService.updateOneTransaction(filter, payload);
  if (!updateTransaction) return next(new AppError('No transaction found with this id.', 404));

  res.status(200).json(updateTransaction);
});

module.exports = {
  getAllTransactions,
  getOneTransaction,
  updateOneTransaction,
};
