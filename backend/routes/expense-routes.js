const express = require('express');
const expenseController = require('../controllers/expense-controller');
const { auth, restrictTo } = require('../middlewares/auth-middleware');

const router = express.Router();

router.use([auth, restrictTo('admin', 'branch-manager')]);

router.route('/').get(expenseController.getAllExpenses).post(expenseController.createNewExpense);
router.route('/:id').get(expenseController.getOneExpense).patch(expenseController.updateOneExpense);

module.exports = router;
