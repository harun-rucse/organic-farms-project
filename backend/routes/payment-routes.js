const express = require('express');
const paymentController = require('../controllers/payment-controller');
const { auth, restrictTo } = require('../middlewares/auth-middleware');

const router = express.Router();

router.post('/checkout', [auth, restrictTo('customer')], paymentController.paymentInit);
router.post('/checkout/success/:tran_id', paymentController.paymentSuccess);
router.post('/checkout/fail/:tran_id', paymentController.paymentFail);
router.post('/checkout/cancel/:tran_id', paymentController.paymentCancel);

module.exports = router;
