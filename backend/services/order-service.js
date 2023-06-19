const { Order } = require('../models/order-model');
const APIFeatures = require('../utils/api-features');

const getTotalCount = (filter) => {
  return Order.countDocuments(filter);
};

const getAllOrders = (filter = {}, query) => {
  return new APIFeatures(Order.find(filter), query).filter().sort().limitFields().paginate().query;
};

const getOneOrder = (filter) => {
  return Order.findOne(filter);
};

const createNewOrder = (payload) => {
  const order = new Order(payload);

  return order.save();
};

const updateOneOrder = (filter, payload) => {
  return Order.findOneAndUpdate(filter, payload, { new: true });
};

const getLatestOrder = (filter) => {
  return Order.find(filter).sort({ orderPlacedDate: -1 }).limit(5);
};

module.exports = {
  getTotalCount,
  getAllOrders,
  getOneOrder,
  createNewOrder,
  updateOneOrder,
  getLatestOrder,
};
