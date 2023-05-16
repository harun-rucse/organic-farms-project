const express = require('express');
const statsController = require('../controllers/statistics-controller');
const { auth, restrictTo, verified } = require('../middlewares/auth-middleware');

const router = express.Router();

router.use([auth, verified, restrictTo('admin', 'branch-manager')]);

router.get('/count', statsController.getAllStatsCount);
router.get('/amount', statsController.getAllStatsAmount);

module.exports = router;
