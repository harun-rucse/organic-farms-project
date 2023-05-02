const express = require('express');
const employeeController = require('../controllers/employee-controller');
const { auth, restrictTo, verified } = require('../middlewares/auth-middleware');
const { uploadImage, saveImageUrl } = require('../middlewares/upload-middleware');

const router = express.Router();

router.use([auth, verified]);
router.get(
  '/delivery-persons',
  restrictTo('admin', 'branch-manager', 'warehouse-employee'),
  employeeController.getAllDeliveryPersons
);

router.use(restrictTo('admin', 'branch-manager'));

router
  .route('/')
  .get(employeeController.getAllEmployees)
  .post([uploadImage, saveImageUrl('employees')], employeeController.createNewEmployee);

router
  .route('/:id')
  .get(employeeController.getOneEmployee)
  .patch([uploadImage, saveImageUrl('employees')], employeeController.updateOneEmployee)
  .delete(employeeController.deleteOneEmployee);

module.exports = router;
