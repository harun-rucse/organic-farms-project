const express = require('express');
const customerController = require('../controllers/customer-controller');
const { auth, restrictTo, verified } = require('../middlewares/auth-middleware');

const router = express.Router();

router.use([auth, verified, restrictTo('admin', 'branch-manager')]);

router.route('/').get(customerController.getAllCustomers);

router
  .route('/:id')
  .get(customerController.getOneCustomer)
  .patch(customerController.updateOneCustomer)
  .delete(customerController.deleteOneCustomer);

module.exports = router;
