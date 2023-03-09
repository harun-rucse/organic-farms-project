const express = require('express');
const productController = require('../controllers/product-controller');
const { auth, restrictTo, verifyOTP } = require('../middlewares/auth-middleware');

const router = express.Router();

router.use([auth, restrictTo('admin', 'branch-manager', 'office-employee')]);

router.route('/').get(productController.getAllProducts).post(verifyOTP, productController.createNewProduct);

router
  .route('/:id')
  .get(productController.getOneProduct)
  .patch(verifyOTP, productController.updateOneProduct)
  .delete(productController.deleteOneProduct);

module.exports = router;
