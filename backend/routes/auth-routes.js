const express = require('express');
const authController = require('../controllers/auth-controller');
const { auth } = require('../middlewares/auth-middleware');

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/send-otp', authController.sendOTP);

router.get('/profile', auth, authController.getProfile);

module.exports = router;
