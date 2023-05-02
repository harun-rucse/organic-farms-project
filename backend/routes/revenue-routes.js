const express = require('express');
const revenueController = require('../controllers/revenue-controller');
const { auth, restrictTo, verified } = require('../middlewares/auth-middleware');

const router = express.Router();

router.use([auth, verified, restrictTo('admin', 'branch-manager')]);

router.get('/', revenueController.getAllRevenues);
router.get('/statistics', revenueController.getRevenueStatistics);
router.get('/:id', revenueController.getOneRevenue);

module.exports = router;
