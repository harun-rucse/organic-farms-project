const express = require('express');
const farmerController = require('../controllers/farmer-controller');
const { auth, restrictTo } = require('../middlewares/auth-middleware');

const router = express.Router();

router.use([auth, restrictTo('admin', 'branch-manager', 'office-employee')]);

router.route('/').get(farmerController.getAllFarmers).post(farmerController.createNewFarmer);

router
  .route('/:id')
  .get(farmerController.getOneFarmer)
  .patch(farmerController.updateOneFarmer)
  .delete(farmerController.deleteOneFarmer);

module.exports = router;