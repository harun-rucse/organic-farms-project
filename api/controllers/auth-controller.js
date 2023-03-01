const config = require('../config');
const authService = require('../services/auth-service');
const tokenService = require('../services/token-service');
const otpService = require('../services/otp-service');
const { validateUser } = require('../models/user-model');
const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');

/**
 * @desc    Register new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = catchAsync(async (req, res, next) => {
  const { error } = validateUser(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  const user = await authService.register(req.body);
  const token = tokenService.generateJwtToken({ id: user._id });

  res.status(201).json(token);
});

/**
 * @desc    Login a user
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = catchAsync(async (req, res, next) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return next(new AppError('Phone and password is required.', 400));
  }

  const user = await authService.login(phone, password);
  const token = tokenService.generateJwtToken({ id: user._id });

  res.status(200).json(token);
});

/**
 * @desc    Get user profile
 * @route   GET /api/auth/profile
 * @access  Private
 */
const getProfile = catchAsync(async (req, res, next) => {
  const user = await authService.getProfile(req.user._id);

  res.status(200).json(user);
});

/**
 * @desc    Send OTP
 * @route   GET /api/auth/send-otp
 * @access  Public
 */
const sendOTP = catchAsync(async (req, res, next) => {
  const { phone } = req.body;

  if (!phone) {
    return next(new AppError('Phone is required.', 400));
  }

  const otp = otpService.generateOTP();

  await otpService.sendOTP(phone, otp);
  // try {
  // } catch (error) {
  //   console.log(error);
  //   return next(new AppError('Error sending SMS', 500));
  // }

  const expires = Date.now() + config.OTP_EXPIRES_IN * 60 * 1000;
  const data = `${phone}.${otp}.${expires}`;
  const hash = otpService.hashOTP(data);

  res.status(200).json({
    hash: `${hash}.${expires}`,
    otp, // For testing purpose
  });
});

module.exports = {
  register,
  login,
  getProfile,
  sendOTP,
};
