const express = require('express');
const subCategoryController = require('../controllers/subcategory-controller');
const { auth, restrictTo, verified } = require('../middlewares/auth-middleware');

const router = express.Router();

router
  .route('/')
  .get(subCategoryController.getAllSubCategories)
  .post(
    [auth, verified, restrictTo('admin', 'branch-manager', 'office-employee')],
    subCategoryController.createNewSubCategory
  );

router
  .route('/:id')
  .get(subCategoryController.getOneSubCategory)
  .patch(
    [auth, verified, restrictTo('admin', 'branch-manager', 'office-employee')],
    subCategoryController.updateOneSubCategory
  )
  .delete(
    [auth, verified, restrictTo('admin', 'branch-manager', 'office-employee')],
    subCategoryController.deleteOneSubCategory
  );

module.exports = router;
