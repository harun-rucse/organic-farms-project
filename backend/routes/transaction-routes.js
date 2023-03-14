const express = require('express');
const transactionController = require('../controllers/transaction-controller');
const { auth, restrictTo } = require('../middlewares/auth-middleware');

const router = express.Router();

router.use([auth, restrictTo('admin', 'branch-manager', 'warehouse-employee')]);

router.get('/', transactionController.getAllTransactions);
router.route('/:id').get(transactionController.getOneTransaction).patch(transactionController.updateOneTransaction);

module.exports = router;
