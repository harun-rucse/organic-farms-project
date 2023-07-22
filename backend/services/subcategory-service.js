const { SubCategory } = require('../models/subcategory-model');
const APIFeatures = require('../utils/api-features');

const getTotalCount = (filter = {}) => {
  return SubCategory.countDocuments(filter);
};

const getAllSubCategories = (filter = {}, query = {}) => {
  return new APIFeatures(SubCategory.find(filter), query).filter().sort().limitFields().paginate().query;
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
  getTotalCount,
  getAllSubCategories,
  getOneSubCategory,
  createNewSubCategory,
  updateOneSubCategory,
  deleteOneSubCategory,
};
