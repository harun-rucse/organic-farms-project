const { Category } = require('../models/category-model');
const APIFeatures = require('../utils/api-features');

const getTotalCount = (filter = {}) => {
  return Category.countDocuments(filter);
};

const getAllCategories = (filter = {}, query) => {
  return new APIFeatures(Category.find(filter), query).filter().sort().limitFields().paginate().query;
};

const getOneCategory = (filter) => {
  return Category.findOne(filter);
};

const createNewCategory = (payload) => {
  const category = new Category(payload);

  return category.save();
};

const updateOneCategory = (filter, payload) => {
  return Category.findOneAndUpdate(filter, payload, { new: true });
};

const deleteOneCategory = (filter) => {
  return Category.findOneAndDelete(filter);
};

module.exports = {
  getTotalCount,
  getAllCategories,
  getOneCategory,
  createNewCategory,
  updateOneCategory,
  deleteOneCategory,
};
