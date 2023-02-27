const express = require('express');
const authController = require('../controllers/auth-controller');
const { auth } = require('../middlewares/auth-middleware');

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);

router.get('/profile', auth, authController.getProfile);

module.exports = router;
