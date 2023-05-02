const express = require('express');
const farmerCardController = require('../controllers/farmer-card-controller');
const { auth, restrictTo, verified } = require('../middlewares/auth-middleware');

const router = express.Router();

router.use([auth, verified, restrictTo('admin', 'branch-manager', 'office-employee')]);

router.route('/').get(farmerCardController.getAllFarmerCards).post(farmerCardController.createNewFarmerCard);
router.route('/:id').get(farmerCardController.getOneFarmerCard).delete(farmerCardController.deleteOneFarmerCard);

module.exports = router;
