const _ = require('lodash');
const { validateOrderUpdate } = require('../models/order-model');
const orderService = require('../services/order-service');
const transactionService = require('../services/transaction-service');
const revenueService = require('../services/revenue-service');
const productService = require('../services/product-service');
const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');

/**
 * @desc    Get latest 5 order
 * @route   GET /api/orders/latest-order
 * @access  Private(admin, branch-manager, office-employee, warehouse-employee)
 */
const getLatestOrder = catchAsync(async (req, res, next) => {
  const filter = { orderStatus: 'Processing' };

  if (req.user.role !== 'admin') {
    filter.branchOffice = req.user.branchOffice;
  }

  const latestOrders = await orderService.getLatestOrder(filter);

  res.status(200).json(latestOrders);
});

/**
 * @desc    Get all orders
 * @route   GET /api/orders
 * @access  Private(admin, branch-manager, warehouse-employee)
 */
const getAllOrders = catchAsync(async (req, res, next) => {
  const filter = req.user.role === 'admin' ? {} : { branchOffice: req.user.branchOffice };
  const allOrders = await orderService.getAllOrders(filter, req.query);
  const totalCount = await orderService.getTotalCount();

  res.status(200).json({
    status: 'success',
    total: totalCount,
    result: allOrders,
  });
});

/**
 * @desc    Get single order
 * @route   GET /api/orders/id
 * @access  Private(admin, branch-manager, warehouse-employee)
 */
const getOneOrder = catchAsync(async (req, res, next) => {
  const filter =
    req.user.role === 'admin' ? { _id: req.params.id } : { _id: req.params.id, branchOffice: req.user.branchOffice };

  const order = await orderService.getOneOrder(filter);
  if (!order) return next(new AppError('No order found with this id.', 404));

  res.status(200).json(order);
});

/**
 * @desc    Update single order
 * @route   PATCH /api/orders/id
 * @access  Private(admin, branch-manager, warehouse-employee)
 */
const updateOneOrder = catchAsync(async (req, res, next) => {
  const { error } = validateOrderUpdate(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  req.body.lastUpdatedBy = req.user._id;
  const filter =
    req.user.role === 'admin'
      ? { _id: req.params.id, orderStatus: { $nin: ['Cancelled', 'Delivered'] } }
      : { _id: req.params.id, branchOffice: req.user.branchOffice, orderStatus: { $nin: ['Cancelled', 'Delivered'] } };

  const payload = _.pick(req.body, ['orderStatus', 'orderDeliveredBy', 'lastUpdatedBy']);
  const updateOrder = await orderService.updateOneOrder(filter, payload);
  if (!updateOrder) return next(new AppError('No order found with this id.', 404));

  // if order status is Cancelled, update all the transaction orderStatus to Cancelled
  if (payload.orderStatus === 'Cancelled') {
    await transactionService.updateManyTransactions({ order: req.params.id }, { status: 'Cancelled' });
    await revenueService.deleteManyRevenues({ order: req.params.id });

    // increase the stock of the products if order is cancelled
    await Promise.all(
      updateOrder.products.map(async (item) => {
        const productDetails = await productService.getOneProduct({ _id: item.product });
        productDetails.inStock += item.quantity;
        await productDetails.save();
      })
    );
  }

  if (payload.orderStatus === 'Delivered') {
    await transactionService.updateManyTransactions({ order: req.params.id }, { status: 'Completed' });
  }

  res.status(200).json(updateOrder);
});

/**
 * @desc    Get my orders
 * @route   GET /api/orders/my-orders
 * @access  Private(customer)
 */
const getMyOrders = catchAsync(async (req, res, next) => {
  const filter = { customer: req.user._id, orderStatus: { $nin: ['Placed'] } };
  const myOrders = await orderService.getAllOrders(filter, req.query);

  res.status(200).json(myOrders);
});

/**
 * @desc    Get my single order
 * @route   GET /api/orders/my-orders/id
 * @access  Private(customer)
 */
const getMySingleOrder = catchAsync(async (req, res, next) => {
  const filter = { _id: req.params.id, customer: req.user._id, orderStatus: { $nin: ['Placed'] } };

  const myOrder = await orderService.getOneOrder(filter);
  if (!myOrder) return next(new AppError('No order found with this id.', 404));

  res.status(200).json(myOrder);
});

module.exports = {
  getLatestOrder,
  getAllOrders,
  getOneOrder,
  updateOneOrder,
  getMyOrders,
  getMySingleOrder,
};
