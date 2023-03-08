const { SubCategory } = require('../models/subcategory-model');

const getAllSubCategories = (filter = {}) => {
  return SubCategory.find(filter);
};

const getOneSubCategory = (filter) => {
  return SubCategory.findOne(filter);
};

const createNewSubCategory = (payload) => {
  const subCategory = new SubCategory(payload);

  return subCategory.save();
};

const updateOneSubCategory = (filter, payload) => {
  return SubCategory.findOneAndUpdate(filter, payload, { new: true });
};

const deleteOneSubCategory = (filter) => {
  return SubCategory.findOneAndDelete(filter);
};

module.exports = {
  getAllSubCategories,
  getOneSubCategory,
  createNewSubCategory,
  updateOneSubCategory,
  deleteOneSubCategory,
};
