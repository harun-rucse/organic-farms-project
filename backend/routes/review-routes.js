const express = require('express');
const reviewController = require('../controllers/review-controller');
const { auth, restrictTo } = require('../middlewares/auth-middleware');

const router = express.Router();

router.use(auth);

router
  .route('/')
  .get(restrictTo('admin', 'branch-manager', 'office-employee'), reviewController.getAllReviews)
  .post(restrictTo('customer'), reviewController.createNewReview);

router
  .route('/:id')
  .get(restrictTo('admin', 'branch-manager', 'office-employee'), reviewController.getOneReview)
  .patch(restrictTo('customer', 'admin', 'branch-manager'), reviewController.updateOneReview)
  .delete(restrictTo('customer', 'admin', 'branch-manager'), reviewController.deleteOneReview);

module.exports = router;
