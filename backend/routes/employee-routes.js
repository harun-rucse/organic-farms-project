const express = require('express');
const employeeController = require('../controllers/employee-controller');
const { auth, restrictTo } = require('../middlewares/auth-middleware');

const router = express.Router();

router.use([auth, restrictTo('admin', 'branch-manager')]);

router.route('/').get(employeeController.getAllEmployees).post(employeeController.createNewEmployee);

router
  .route('/:id')
  .get(employeeController.getOneEmployee)
  .patch(employeeController.updateOneEmployee)
  .delete(employeeController.deleteOneEmployee);

module.exports = router;
