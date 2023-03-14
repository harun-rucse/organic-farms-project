const { Order } = require('../models/order-model');

const getAllOrders = (filter = {}) => {
  return Order.find(filter);
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

module.exports = {
  getAllOrders,
  getOneOrder,
  createNewOrder,
  updateOneOrder,
};
