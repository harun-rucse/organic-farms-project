const { Product } = require('../models/product-model');
const APIFeatures = require('../utils/api-features');

const getTotalCount = (filter = {}) => {
  return Product.countDocuments(filter);
};

const getAllProducts = (filter = {}, query) => {
  return new APIFeatures(Product.find(filter), query).filter().sort().limitFields().paginate().query;
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

const searchProducts = (query) => {
  const name = query.name;
  return Product.find({ name: { $regex: name, $options: 'i' } });
};

module.exports = {
  getTotalCount,
  getAllProducts,
  getOneProduct,
  createNewProduct,
  updateOneProduct,
  deleteOneProduct,
  searchProducts,
};
