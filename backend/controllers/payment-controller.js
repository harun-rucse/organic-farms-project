const _ = require('lodash');
const { ObjectId } = require('mongoose').Types;
const SSLCommerzPayment = require('sslcommerz-lts');
const { validateOrder, validateOrderUpdate } = require('../models/order-model');
const orderService = require('../services/order-service');
const productService = require('../services/product-service');
const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');

const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = false;

const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

/**
 * @desc    Create new Unpaid order and redirect to payment gateway
 * @route   POST /api/payment/checkout
 * @access  Private(customer)
 */
const paymentInit = catchAsync(async (req, res, next) => {
  const { error } = validateOrder(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  req.body.customer = req.user._id;
  req.body.paymentStatus = 'Unpaid';
  req.body.paymentMethod = 'Bkash';

  let total_amount = 0;
  let products_name = [];
  let products_category = [];

  const tran_id = new ObjectId().toString();
  const cus_name = req.user.name;
  const cus_add1 = req.user.address;
  const cus_phone = req.user.phone;
  const cus_email = req.body.email;
  const shipping_method = 'Courier';
  const ship_city = req.body.city;
  const ship_postcode = req.body.postcode;
  const ship_country = 'Bangladesh';
  const product_profile = 'physical-goods';
  const ship_add1 = req.body.deliveryAddress;

  const payload = _.pick(req.body, ['customer', 'deliveryAddress', 'products', 'paymentMethod', 'paymentStatus']);

  // seperate the orders by branch office
  const products = [];

  await Promise.all(
    payload.products.map(async (item) => {
      const productDetails = await productService.getOneProduct({ _id: item.product });
      if (!productDetails) return next(new AppError('Product not found.', 404));

      if (productDetails.inStock < item.quantity)
        return Promise.reject(new AppError(`Only ${productDetails.inStock} KG left in stock`, 400));

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
      city: ship_city,
      postcode: ship_postcode,
      products: productGroup[branchOffices[i]],
      paymentMethod: payload.paymentMethod,
      paymentStatus: 'Unpaid',
      transactionId: tran_id,
      branchOffice: branchOffices[i],
    };
    orders.push(order);
  }

  // create orders for each branch office
  const newOrders = [];
  await Promise.all(
    orders.map(async (order) => {
      const newOrder = await orderService.createNewOrder(order);
      newOrders.push(newOrder);
    })
  );

  await Promise.all(
    newOrders.map(async (order) => {
      total_amount += order.grandTotalAmount;

      await Promise.all(
        await order.products.map(async (item) => {
          const productData = await productService.getOneProduct({ _id: item.product });

          products_name.push(productData.name);
          products_category.push(productData.subcategory.name);
        })
      );
    })
  );

  const product_name = products_name.join(', ');
  const product_category = products_category.join(', ');

  const success_url = `${process.env.BASE_URL}/api/payment/checkout/success/${tran_id}`;
  const fail_url = `${process.env.BASE_URL}/api/payment/checkout/fail/${tran_id}`;
  const cancel_url = `${process.env.BASE_URL}/api/payment/checkout/cancel/${tran_id}`;
  const ipn_url = `${process.env.BASE_URL}/api/payment/checkout/ipn/${tran_id}`;

  const data = {
    total_amount,
    currency: 'BDT',
    tran_id,
    success_url,
    fail_url,
    cancel_url,
    ipn_url,
    cus_name,
    cus_phone,
    cus_email,
    cus_add1,
    shipping_method,
    ship_city,
    ship_postcode,
    ship_country,
    product_name,
    product_category,
    product_profile,
    ship_name: cus_name,
    ship_add1,
  };

  sslcz.init(data).then((apiResponse) => {
    const GatewayPageURL = apiResponse.GatewayPageURL;

    res.status(200).json({
      status: 'success',
      result: GatewayPageURL,
    });
  });
});

/**
 * @desc    Update order status after payment success
 * @route   POST /api/payment/checkout/success/:tran_id
 * @access  Public
 */
const paymentSuccess = catchAsync(async (req, res, next) => {
  const { tran_id } = req.params;

  const orders = await orderService.getAllOrders({ transactionId: tran_id });
  if (!orders.length) return res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);

  await Promise.all(
    orders.map(async (order) => {
      await orderService.updateOneOrder({ _id: order._id }, { paymentStatus: 'Paid', orderStatus: 'Processing' });
    })
  );

  res.redirect(`${process.env.FRONTEND_URL}/payment-success`);
});

/**
 * @desc    Delete order after payment fail
 * @route   POST /api/payment/checkout/fail/:tran_id
 * @access  Public
 */
const paymentFail = catchAsync(async (req, res, next) => {
  const { tran_id } = req.params;

  const orders = await orderService.getAllOrders({ transactionId: tran_id });
  if (!orders.length) return res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);

  // delete all orders
  await Promise.all(
    orders.map(async (order) => {
      await orderService.deleteOneOrder({ _id: order._id });
    })
  );

  res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);
});

/**
 * @desc    Delete order after payment cancel
 * @route   POST /api/payment/checkout/cancel/:tran_id
 * @access  Public
 */
const paymentCancel = catchAsync(async (req, res, next) => {
  const { tran_id } = req.params;

  const orders = await orderService.getAllOrders({ transactionId: tran_id });
  if (!orders.length) return res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);

  // delete all orders
  await Promise.all(
    orders.map(async (order) => {
      await orderService.deleteOneOrder({ _id: order._id });
    })
  );

  res.redirect(`${process.env.FRONTEND_URL}/payment-failed`);
});

module.exports = {
  paymentInit,
  paymentSuccess,
  paymentFail,
  paymentCancel,
};
