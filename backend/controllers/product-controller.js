const _ = require('lodash');
const { validateProduct, validateProductUpdate } = require('../models/product-model');
const productService = require('../services/product-service');
const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');

/**
 * @desc    Get all products
 * @route   GET /api/products
 * @access  Private(admin, branch-manager, office-employee)
 */
const getAllProducts = catchAsync(async (req, res, next) => {
  const filter = req.user.role === 'admin' ? {} : { branchOffice: req.user.branchOffice };
  const allProducts = await productService.getAllProducts(filter, req.query);
  const totalCount = await productService.getTotalCount(filter);

  res.status(200).json({
    status: 'success',
    total: totalCount,
    result: allProducts,
  });
});

/**
 * @desc    Get all products for frontend
 * @route   GET /api/products/frontend
 * @access  Public
 */
const getAllProductsFrontend = catchAsync(async (req, res, next) => {
  const allProducts = await productService.getAllProducts({}, req.query);
  const totalCount = await productService.getTotalCount(req.query);

  res.status(200).json({
    status: 'success',
    total: totalCount,
    result: allProducts,
  });
});

/**
 * @desc    Get single product for frontend
 * @route   GET /api/products/frontend/id
 * @access  Public
 */
const getOneProductFrontend = catchAsync(async (req, res, next) => {
  const product = await productService.getOneProduct({ _id: req.params.id });
  if (!product) return next(new AppError('No product found with this id.', 404));

  res.status(200).json(product);
});

/**
 * @desc    Get single product
 * @route   GET /api/products/id
 * @access  Private(admin, branch-manager, office-employee)
 */
const getOneProduct = catchAsync(async (req, res, next) => {
  const filter =
    req.user.role === 'admin' ? { _id: req.params.id } : { _id: req.params.id, branchOffice: req.user.branchOffice };

  const product = await productService.getOneProduct(filter);
  if (!product) return next(new AppError('No product found with this id.', 404));

  res.status(200).json(product);
});

/**
 * @desc    Create new product
 * @route   POST /api/products
 * @access  Private(admin, branch-manager, office-employee)
 */
const createNewProduct = catchAsync(async (req, res, next) => {
  const { error } = validateProduct(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  // Set createdBy to the logged in user
  req.body.createdBy = req.user._id;

  // Set branchOffice to the logged in user's branchOffice if the logged in user is not an admin
  if (req.user.role !== 'admin') req.body.branchOffice = req.user.branchOffice;

  const payload = _.pick(req.body, [
    'name',
    'subcategory',
    'price',
    'description',
    'minimumOrder',
    'maximumOrder',
    'maxDeliveryDays',
    'farmer',
    'ratingQty',
    'ratingAvg',
    'inStock',
    'images',
    'active',
    'branchOffice',
    'createdBy',
  ]);
  const newProduct = await productService.createNewProduct(payload);

  res.status(201).json(newProduct);
});

/**
 * @desc    Update single product
 * @route   PATCH /api/products/id
 * @access  Private(admin, branch-manager, office-employee)
 */
const updateOneProduct = catchAsync(async (req, res, next) => {
  const { error } = validateProductUpdate(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  // Set lastUpdatedBy to the logged in user
  req.body.lastUpdatedBy = req.user._id;
  const filter =
    req.user.role === 'admin' ? { _id: req.params.id } : { _id: req.params.id, branchOffice: req.user.branchOffice };

  const payload = _.pick(req.body, [
    'name',
    'subcategory',
    'price',
    'description',
    'minimumOrder',
    'maximumOrder',
    'maxDeliveryDays',
    'ratingQty',
    'ratingAvg',
    'inStock',
    'images',
    'active',
    'lastUpdatedBy',
  ]);
  const updateProduct = await productService.updateOneProduct(filter, payload);
  if (!updateProduct) return next(new AppError('No product found with this id.', 404));

  res.status(200).json(updateProduct);
});

/**
 * @desc    Delete single product
 * @route   DELETE /api/products/id
 * @access  Private(admin, branch-manager, office-employee)
 */
const deleteOneProduct = catchAsync(async (req, res, next) => {
  const filter =
    req.user.role === 'admin' ? { _id: req.params.id } : { _id: req.params.id, branchOffice: req.user.branchOffice };
  const deleteProduct = await productService.deleteOneProduct(filter);
  if (!deleteProduct) return next(new AppError('No product found with this id.', 404));

  res.status(204).send();
});

/**
 * @desc    Search products
 * @route   GET /api/products/search?name=abc
 * @access  Public
 */
const searchProducts = catchAsync(async (req, res, next) => {
  const allProducts = await productService.searchProducts(req.query);

  res.status(200).json({
    status: 'success',
    result: allProducts,
  });
});

module.exports = {
  getAllProducts,
  getOneProduct,
  createNewProduct,
  updateOneProduct,
  deleteOneProduct,
  getAllProductsFrontend,
  getOneProductFrontend,
  searchProducts,
};
