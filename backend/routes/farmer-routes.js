const express = require('express');
const farmerController = require('../controllers/farmer-controller');
const { auth, restrictTo, verifyOTP } = require('../middlewares/auth-middleware');
const { uploadImage, saveImageUrl } = require('../middlewares/upload-middleware');

const router = express.Router();

router.use([auth, restrictTo('admin', 'branch-manager', 'office-employee')]);

router
  .route('/')
  .get(farmerController.getAllFarmers)
  .post([verifyOTP, uploadImage, saveImageUrl('farmers')], farmerController.createNewFarmer);

router
  .route('/:id')
  .get(farmerController.getOneFarmer)
  .patch([verifyOTP, uploadImage, saveImageUrl('farmers')], farmerController.updateOneFarmer)
  .delete(farmerController.deleteOneFarmer);

module.exports = router;
