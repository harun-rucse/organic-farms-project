const express = require('express');
const transactionController = require('../controllers/transaction-controller');
const { auth, restrictTo, verified } = require('../middlewares/auth-middleware');

const router = express.Router();

router.use([auth, verified, restrictTo('admin', 'branch-manager')]);

router.get('/', transactionController.getAllTransactions);
router.route('/:id').get(transactionController.getOneTransaction).patch(transactionController.updateOneTransaction);

module.exports = router;
