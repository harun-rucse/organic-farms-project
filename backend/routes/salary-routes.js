const express = require('express');
const salaryController = require('../controllers/salary-controller');
const { auth, restrictTo, verified } = require('../middlewares/auth-middleware');

const router = express.Router();

router.use([auth, verified, restrictTo('admin')]);

router.route('/').get(salaryController.getAllSalaries).post(salaryController.createNewSalary);

router
  .route('/:id')
  .get(salaryController.getOneSalary)
  .patch(salaryController.updateOneSalary)
  .delete(salaryController.deleteOneSalary);

module.exports = router;
