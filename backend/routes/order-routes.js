const express = require('express');
const orderController = require('../controllers/order-controller');
const { auth, restrictTo } = require('../middlewares/auth-middleware');

const router = express.Router();

router.use(auth);

router
  .route('/')
  .get(restrictTo('admin', 'branch-manager', 'warehouse-employee'), orderController.getAllOrders)
  .post(restrictTo('customer'), orderController.createNewOrder);

router
  .route('/:id')
  .get(restrictTo('admin', 'branch-manager', 'warehouse-employee'), orderController.getOneOrder)
  .patch(restrictTo('admin', 'branch-manager', 'warehouse-employee'), orderController.updateOneOrder);

module.exports = router;
