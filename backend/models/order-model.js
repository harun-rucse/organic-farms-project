const _ = require('lodash');
const Joi = require('joi');
const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const productService = require('../services/product-service');
const branchService = require('../services/branch-service');
const smsService = require('../services/sms-service');
const { Transaction } = require('./transaction-model');

const orderSchema = new Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    postcode: {
      type: String,
      required: true,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: Number,
        farmer: {
          type: Schema.Types.ObjectId,
          ref: 'Farmer',
        },
      },
    ],
    totalAmount: Number,
    deliveryCharge: Number,
    grandTotalAmount: Number,
    paymentMethod: {
      type: String,
      required: true,
      enum: ['COD', 'Bkash', 'Rocket', 'Nagad', 'Bank'],
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ['Paid', 'Unpaid'],
    },
    orderStatus: {
      type: String,
      enum: ['Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Placed',
    },
    transactionId: String,
    orderPlacedDate: {
      type: Date,
      default: Date.now,
    },
    orderDeliveredBy: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
    },
    orderDeliveredDate: Date,
    branchOffice: {
      type: Schema.Types.ObjectId,
      ref: 'Branch',
      required: true,
    },
    lastUpdatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.pre(/^find/, function (next) {
  this.populate('customer', 'name phone address image');
  this.populate(
    'products.product',
    'name price images description -farmer -subcategory -branchOffice -createdBy -lastUpdatedBy'
  );
  this.populate('products.farmer', 'name phone address image -branchOffice -createdBy -lastUpdatedBy');
  this.populate('branchOffice', 'name phone address -createdBy -lastUpdatedBy');
  this.populate('orderDeliveredBy', '-role -salary -branchOffice -createdBy -lastUpdatedBy -createdAt -updatedAt');
  this.populate('lastUpdatedBy', 'name phone');

  next();
});

orderSchema.pre('save', async function (next) {
  const order = this;
  let totalAmount = 0;
  let deliveryCharge = 0;
  let grandTotalAmount = 0;

  await Promise.all(
    order.products.map(async (item) => {
      const productDetails = await productService.getOneProduct({ _id: item.product });

      const price = item.quantity * productDetails.price;
      item.price = price;
      totalAmount += price;

      const branchDetails = await branchService.getOneBranch({ _id: order.branchOffice });
      deliveryCharge += item.quantity * branchDetails.deliveryFee; // item.quantity * productDetails.deliveryCharge
    })
  );

  grandTotalAmount = totalAmount + deliveryCharge;

  order.totalAmount = totalAmount;
  order.deliveryCharge = deliveryCharge;
  order.grandTotalAmount = grandTotalAmount;

  next();
});

orderSchema.post(/^findOneAndUpdate/, async function (doc) {
  const order = doc;
  if (order?.paymentStatus === 'Unpaid' || order?.orderStatus !== 'Processing') return;

  // decrease the stock of the products if order paymentStatus id paid
  await Promise.all(
    order.products.map(async (item) => {
      const productDetails = await productService.getOneProduct({ _id: item.product });
      productDetails.inStock -= item.quantity;
      await productDetails.save();
    })
  );

  const transactions = [];

  // group the products by farmer
  const productGroup = _.groupBy(order.products, 'farmer');
  const farmers = Object.keys(productGroup);

  await Promise.all(
    farmers.map(async (farmer) => {
      const products = productGroup[farmer];
      const totalAmount = products.reduce((acc, item) => acc + item.price, 0);

      const branchDetails = await branchService.getOneBranch({ _id: order.branchOffice });
      const chargeAmount = (branchDetails.costPercentage / 100) * totalAmount;
      const payableAmount = totalAmount - chargeAmount;

      const farmerId = products[0]?.farmer?._id;

      const transaction = new Transaction({
        farmer: farmerId,
        customer: order.customer,
        products: products,
        order: order._id,
        totalAmount: totalAmount,
        chargeAmount: chargeAmount,
        payableAmount: payableAmount,
        branchOffice: order.branchOffice,
      });

      transactions.push(transaction);
    })
  );

  // Send the order confirmation SMS to the customer
  // smsService.sendSMS(order?.customer?.phone, `Your order has been placed successfully. Order ID: ${order._id}`);

  // Send the SMS to the farmer about the new order
  // farmers.forEach(async (farmer) => {
  //   smsService.sendSMS(farmer?.phone, `You have a new order. Order ID: ${order._id}`);
  // });

  await Transaction.insertMany(transactions);
});

const validateOrder = (order) => {
  const schema = Joi.object({
    deliveryAddress: Joi.string().required().label('Delivery Address'),
    city: Joi.string().required(),
    postcode: Joi.string().required(),
    email: Joi.string().email().allow('').label('Email'),
    products: Joi.array().items(
      Joi.object({
        product: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required(),
      })
        .required()
        .min(1)
    ),
  });

  return schema.validate(order);
};

const validateOrderUpdate = (order) => {
  const schema = Joi.object({
    orderStatus: Joi.string().valid('Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'),
    orderDeliveredBy: Joi.string(),
  });

  return schema.validate(order);
};

const Order = model('Order', orderSchema);

module.exports = {
  Order,
  validateOrder,
  validateOrderUpdate,
};
