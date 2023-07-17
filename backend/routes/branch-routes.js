const express = require('express');
const branchController = require('../controllers/branch-controller');
const { auth, restrictTo, verified } = require('../middlewares/auth-middleware');

const router = express.Router();

router
  .route('/')
  .get(branchController.getAllBranches)
  .post([auth, verified, restrictTo('admin')], branchController.createNewBranch);

router.use([auth, verified, restrictTo('admin')]);

router
  .route('/:id')
  .get(branchController.getOneBranch)
  .patch(branchController.updateOneBranch)
  .delete(branchController.deleteOneBranch);

module.exports = router;
