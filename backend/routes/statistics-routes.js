const express = require('express');
const statsController = require('../controllers/statistics-controller');
const { auth, restrictTo, verified } = require('../middlewares/auth-middleware');

const router = express.Router();

router.use([auth, verified]);

router.get(
  '/count',
  [restrictTo('admin', 'branch-manager', 'office-employee', 'warehouse-employee')],
  statsController.getAllStatsCount
);
router.get('/amount', [restrictTo('admin', 'branch-manager')], statsController.getAllStatsAmount);

module.exports = router;
