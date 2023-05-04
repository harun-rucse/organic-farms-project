const _ = require('lodash');
const { validateUserUpdate } = require('../models/user-model');
const userService = require('../services/user-service');
const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');

/**
 * @desc    Get all customers
 * @route   GET /api/customers
 * @access  Private(admin, branch-manager)
 */
const getAllCustomers = catchAsync(async (req, res, next) => {
  const filter = { role: 'customer' };
  const allCustomers = await userService.getAllUsers(filter);

  res.status(200).json(allCustomers);
});

/**
 * @desc    Get single customer
 * @route   GET /api/customers/id
 * @access  Private(admin, branch-manager)
 */
const getOneCustomer = catchAsync(async (req, res, next) => {
  const filter = { _id: req.params.id, role: 'customer' };

  const customer = await userService.getOneUser(filter);
  if (!customer) return next(new AppError('No customer found with this id.', 404));

  res.status(200).json(customer);
});

/**
 * @desc    Update single customer
 * @route   PATCH /api/customers/id
 * @access  Private(admin, branch-manager)
 */
const updateOneCustomer = catchAsync(async (req, res, next) => {
  const { error } = validateUserUpdate(_.pick(req.body, ['name', 'address', 'phone', 'verified']));

  if (error) return next(new AppError(error.details[0].message, 400));

  const payload = _.pick(req.body, ['name', 'address', 'phone', 'verified']);

  const filter = { _id: req.params.id, role: 'customer' };
  const updateCustomer = await userService.updateOneUser(filter, payload);
  if (!updateCustomer) return next(new AppError('No customer found with this id.', 404));

  res.status(200).json(updateCustomer);
});

/**
 * @desc    Delete single customer
 * @route   DELETE /api/customers/id
 * @access  Private(admin, branch-manager)
 */
const deleteOneCustomer = catchAsync(async (req, res, next) => {
  const filter = { _id: req.params.id, role: 'customer' };

  const deleteCustomer = await userService.deleteOneUser(filter);
  if (!deleteCustomer) return next(new AppError('No customer found with this id.', 404));

  res.status(204).send();
});

module.exports = {
  getAllCustomers,
  getOneCustomer,
  updateOneCustomer,
  deleteOneCustomer,
};
