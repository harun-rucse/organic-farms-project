const { Category } = require('../models/category-model');

const getAllCategories = (filter = {}) => {
  return Category.find(filter);
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
  getAllCategories,
  getOneCategory,
  createNewCategory,
  updateOneCategory,
  deleteOneCategory,
};
