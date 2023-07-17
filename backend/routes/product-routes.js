const express = require('express');
const productController = require('../controllers/product-controller');
const { auth, restrictTo, verifyOTP, verified } = require('../middlewares/auth-middleware');
const { uploadImages, saveImagesUrl } = require('../middlewares/upload-middleware');

const router = express.Router();

router.get('/frontend', productController.getAllProductsFrontend);
router.get('/frontend/:id', productController.getOneProductFrontend);
router.get('/search', productController.searchProducts);

router.use([auth, verified, restrictTo('admin', 'branch-manager', 'office-employee')]);

router
  .route('/')
  .get(productController.getAllProducts)
  .post([uploadImages, verifyOTP, saveImagesUrl('products')], productController.createNewProduct);

router
  .route('/:id')
  .get(productController.getOneProduct)
  .patch([uploadImages, verifyOTP, saveImagesUrl('products')], productController.updateOneProduct)
  .delete(productController.deleteOneProduct);

module.exports = router;
