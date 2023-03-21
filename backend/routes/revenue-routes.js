const express = require('express');
const revenueController = require('../controllers/revenue-controller');
const { auth, restrictTo } = require('../middlewares/auth-middleware');

const router = express.Router();

router.use([auth, restrictTo('admin', 'branch-manager')]);

router.get('/', revenueController.getAllRevenues);
router.get('/:id', revenueController.getOneRevenue);

module.exports = router;
