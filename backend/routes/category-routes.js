const express = require('express');
const categoryController = require('../controllers/category-controller');
const { auth, restrictTo, verified } = require('../middlewares/auth-middleware');
const { uploadImage, saveImageUrl } = require('../middlewares/upload-middleware');

const router = express.Router();

router
  .route('/')
  .get(categoryController.getAllCategories)
  .post(
    [auth, verified, restrictTo('admin', 'branch-manager', 'office-employee'), uploadImage, saveImageUrl('categories')],
    categoryController.createNewCategory
  );

router
  .route('/:id')
  .get(categoryController.getOneCategory)
  .patch(
    [auth, verified, restrictTo('admin', 'branch-manager', 'office-employee'), uploadImage, saveImageUrl('categories')],
    categoryController.updateOneCategory
  )
  .delete(
    [auth, verified, restrictTo('admin', 'branch-manager', 'office-employee')],
    categoryController.deleteOneCategory
  );

module.exports = router;
