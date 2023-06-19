const _ = require('lodash');
const { validateSubCategory, validateSubCategoryUpdate } = require('../models/subcategory-model');
const subCategoryService = require('../services/subcategory-service');
const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');

/**
 * @desc    Get all sub categories
 * @route   GET /api/sub-categories
 * @access  Public
 */
const getAllSubCategories = catchAsync(async (req, res, next) => {
  const allSubCategories = await subCategoryService.getAllSubCategories({}, req.query);
  const totalCount = await subCategoryService.getTotalCount();

  res.status(200).json({
    status: 'success',
    total: totalCount,
    result: allSubCategories,
  });
});

/**
 * @desc    Get single sub category
 * @route   GET /api/sub-categories/id
 * @access  Public
 */
const getOneSubCategory = catchAsync(async (req, res, next) => {
  const subCategory = await subCategoryService.getOneSubCategory({ _id: req.params.id });
  if (!subCategory) return next(new AppError('No sub category found with this id.', 404));

  res.status(200).json(subCategory);
});

/**
 * @desc    Create new sub category
 * @route   POST /api/sub-categories
 * @access  Private(admin, branch-manager, office-employee)
 */
const createNewSubCategory = catchAsync(async (req, res, next) => {
  const { error } = validateSubCategory(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  // Set createdBy to the logged in user
  req.body.createdBy = req.user._id;

  const payload = _.pick(req.body, ['name', 'category', 'createdBy']);
  const newSubCategory = await subCategoryService.createNewSubCategory(payload);

  res.status(201).json(newSubCategory);
});

/**
 * @desc    Update single sub category
 * @route   PATCH /api/sub-categories/id
 * @access  Private(admin, branch-manager, office-employee)
 */
const updateOneSubCategory = catchAsync(async (req, res, next) => {
  const { error } = validateSubCategoryUpdate(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  // Set lastUpdatedBy to the logged in user
  req.body.lastUpdatedBy = req.user._id;

  const payload = _.pick(req.body, ['name', 'lastUpdatedBy']);
  const updateSubCategory = await subCategoryService.updateOneSubCategory({ _id: req.params.id }, payload);
  if (!updateSubCategory) return next(new AppError('No sub category found with this id.', 404));

  res.status(200).json(updateSubCategory);
});

/**
 * @desc    Delete single sub category
 * @route   DELETE /api/sub-categories/id
 * @access  Private(admin, branch-manager, office-employee)
 */
const deleteOneSubCategory = catchAsync(async (req, res, next) => {
  const deleteSubCategory = await subCategoryService.deleteOneSubCategory({ _id: req.params.id });
  if (!deleteSubCategory) return next(new AppError('No sub category found with this id.', 404));

  res.status(204).send();
});

module.exports = {
  getAllSubCategories,
  getOneSubCategory,
  createNewSubCategory,
  updateOneSubCategory,
  deleteOneSubCategory,
};
