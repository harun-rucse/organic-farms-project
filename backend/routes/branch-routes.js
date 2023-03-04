const express = require('express');
const branchController = require('../controllers/branch-controller');
const { auth, restrictTo } = require('../middlewares/auth-middleware');

const router = express.Router();

router
  .route('/')
  .get(auth, branchController.getAllBranches)
  .post([auth, restrictTo('admin')], branchController.createNewBranch);

router.use([auth, restrictTo('admin')]);

router
  .route('/:id')
  .get(branchController.getOneBranch)
  .patch(branchController.updateOneBranch)
  .delete(branchController.deleteOneBranch);

module.exports = router;
