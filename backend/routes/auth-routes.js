const express = require('express');
const authController = require('../controllers/auth-controller');
const { auth, verified } = require('../middlewares/auth-middleware');
const { uploadImage, saveImageUrl } = require('../middlewares/upload-middleware');

const router = express.Router();

router.post('/login', authController.login);
router.post('/login-organization', authController.loginOrganization);
router.post('/register', [uploadImage, saveImageUrl('users')], authController.register);
router.post('/send-otp', [auth, verified], authController.sendOTP);

router.get('/profile', auth, authController.getProfile);
router.patch('/profile', [auth, uploadImage, saveImageUrl('users')], authController.updateProfile);
router.patch('/update-password', auth, authController.updatePassword);

module.exports = router;
