const { Product } = require('../models/product-model');

const getAllProducts = (filter = {}) => {
  return Product.find(filter);
};

const getOneProduct = (filter) => {
  return Product.findOne(filter);
};

const createNewProduct = (payload) => {
  const product = new Product(payload);

  return product.save();
};

const updateOneProduct = (filter, payload) => {
  return Product.findOneAndUpdate(filter, payload, { new: true });
};

const deleteOneProduct = (filter) => {
  return Product.findOneAndDelete(filter);
};

module.exports = {
  getAllProducts,
  getOneProduct,
  createNewProduct,
  updateOneProduct,
  deleteOneProduct,
};
