const _ = require('lodash');
const { validateCategory, validateCategoryUpdate } = require('../models/category-model');
const categoryService = require('../services/category-service');
const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');

/**
 * @desc    Get all categories
 * @route   GET /api/categories
 * @access  Public
 */
const getAllCategories = catchAsync(async (req, res, next) => {
  const allCategories = await categoryService.getAllCategories();

  res.status(200).json(allCategories);
});

/**
 * @desc    Get single category
 * @route   GET /api/categories/id
 * @access  Public
 */
const getOneCategory = catchAsync(async (req, res, next) => {
  const category = await categoryService.getOneCategory({ _id: req.params.id });
  if (!category) return next(new AppError('No category found with this id.', 404));

  res.status(200).json(category);
});

/**
 * @desc    Create new category
 * @route   POST /api/categories
 * @access  Private(admin, branch-manager, office-employee)
 */
const createNewCategory = catchAsync(async (req, res, next) => {
  const { error } = validateCategory(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  // Set createdBy to the logged in user
  req.body.createdBy = req.user._id;

  const payload = _.pick(req.body, ['name', 'description', 'image', 'createdBy']);
  const newCategory = await categoryService.createNewCategory(payload);

  res.status(201).json(newCategory);
});

/**
 * @desc    Update single category
 * @route   PATCH /api/categories/id
 * @access  Private(admin, branch-manager, office-employee)
 */
const updateOneCategory = catchAsync(async (req, res, next) => {
  const { error } = validateCategoryUpdate(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  // Set lastUpdatedBy to the logged in user
  req.body.lastUpdatedBy = req.user._id;

  const payload = _.pick(req.body, ['name', 'description', 'image', 'lastUpdatedBy']);
  const updateCategory = await categoryService.updateOneCategory({ _id: req.params.id }, payload);
  if (!updateCategory) return next(new AppError('No category found with this id.', 404));

  res.status(200).json(updateCategory);
});

/**
 * @desc    Delete single category
 * @route   DELETE /api/categories/id
 * @access  Private(admin, branch-manager, office-employee)
 */
const deleteOneCategory = catchAsync(async (req, res, next) => {
  const deleteCategory = await categoryService.deleteOneCategory({ _id: req.params.id });
  if (!deleteCategory) return next(new AppError('No category found with this id.', 404));

  res.status(204).send();
});

module.exports = {
  getAllCategories,
  getOneCategory,
  createNewCategory,
  updateOneCategory,
  deleteOneCategory,
};
