const _ = require('lodash');
const { validateOrder, validateOrderUpdate } = require('../models/order-model');
const orderService = require('../services/order-service');
const productService = require('../services/product-service');
const transactionService = require('../services/transaction-service');
const revenueService = require('../services/revenue-service');
const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');

/**
 * @desc    Get latest 5 order
 * @route   GET /api/orders/latest-order
 * @access  Private(admin, branch-manager, office-employee, warehouse-employee)
 */
const getLatestOrder = catchAsync(async (req, res, next) => {
  const filter = { orderStatus: 'Placed' };

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
 * @desc    Create new order
 * @route   POST /api/orders
 * @access  Private(customer)
 */
const createNewOrder = catchAsync(async (req, res, next) => {
  const { error } = validateOrder(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  req.body.customer = req.user._id;

  const payload = _.pick(req.body, ['customer', 'deliveryAddress', 'products', 'paymentMethod', 'paymentStatus']);

  // seperate the orders by branch office
  const products = [];

  await Promise.all(
    payload.products.map(async (item) => {
      const productDetails = await productService.getOneProduct({ _id: item.product });
      if (!productDetails) return next(new AppError('Product not found.', 404));

      if (productDetails.minimumOrder > item.quantity)
        return Promise.reject(new AppError(`You can order minimum ${productDetails.minimumOrder} KG`, 400));

      if (productDetails.maximumOrder < item.quantity)
        return Promise.reject(new AppError(`You can order maximum ${productDetails.maximumOrder} KG`, 400));

      products.push({
        product: item.product,
        quantity: item.quantity,
        branchOffice: productDetails.branchOffice._id,
        farmer: productDetails.farmer._id,
      });
    })
  );

  // group the products by branch office
  const productGroup = _.groupBy(products, 'branchOffice');
  const branchOffices = Object.keys(productGroup);
  const orders = [];

  for (let i = 0; i < branchOffices.length; i++) {
    const order = {
      customer: payload.customer,
      deliveryAddress: payload.deliveryAddress,
      products: productGroup[branchOffices[i]],
      paymentMethod: payload.paymentMethod,
      paymentStatus: payload.paymentStatus,
      branchOffice: branchOffices[i],
    };
    orders.push(order);
  }

  // create orders for each branch office
  await Promise.all(
    orders.map(async (order) => {
      await orderService.createNewOrder(order);
    })
  );

  res.status(201).json({ message: 'Order Placed successfully.' });
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
  }

  if (payload.orderStatus === 'Delivered') {
    await transactionService.updateManyTransactions({ order: req.params.id }, { status: 'Completed' });
  }

  res.status(200).json(updateOrder);
});

module.exports = {
  getLatestOrder,
  getAllOrders,
  getOneOrder,
  createNewOrder,
  updateOneOrder,
};
