const express = require('express');
const orderController = require('../controllers/order-controller');
const { auth, restrictTo, verified, verifyOTP } = require('../middlewares/auth-middleware');

const router = express.Router();

router.use([auth, verified]);

router.get('/my-orders', restrictTo('customer'), orderController.getMyOrders);
router.get('/my-orders/:id', restrictTo('customer'), orderController.getMySingleOrder);
router.get(
  '/latest-orders',
  restrictTo('admin', 'branch-manager', 'office-employee', 'warehouse-employee'),
  orderController.getLatestOrder
);

router.route('/').get(restrictTo('admin', 'branch-manager', 'warehouse-employee'), orderController.getAllOrders);

router
  .route('/:id')
  .get(restrictTo('admin', 'branch-manager', 'warehouse-employee'), orderController.getOneOrder)
  .patch([restrictTo('admin', 'branch-manager', 'warehouse-employee'), verifyOTP], orderController.updateOneOrder);

module.exports = router;
