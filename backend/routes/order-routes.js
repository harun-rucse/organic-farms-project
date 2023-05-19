const express = require('express');
const orderController = require('../controllers/order-controller');
const { auth, restrictTo, verified, verifyOTP } = require('../middlewares/auth-middleware');

const router = express.Router();

router.use([auth, verified]);

router.get(
  '/latest-orders',
  restrictTo('admin', 'branch-manager', 'office-employee', 'warehouse-employee'),
  orderController.getLatestOrder
);

router
  .route('/')
  .get(restrictTo('admin', 'branch-manager', 'warehouse-employee'), orderController.getAllOrders)
  .post(restrictTo('customer'), orderController.createNewOrder);

router
  .route('/:id')
  .get(restrictTo('admin', 'branch-manager', 'warehouse-employee'), orderController.getOneOrder)
  .patch([restrictTo('admin', 'branch-manager', 'warehouse-employee'), verifyOTP], orderController.updateOneOrder);

module.exports = router;
