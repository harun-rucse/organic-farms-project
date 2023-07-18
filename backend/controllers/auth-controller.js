const _ = require('lodash');
const authService = require('../services/auth-service');
const tokenService = require('../services/token-service');
const otpService = require('../services/otp-service');
const { validateUser, validateUserUpdate } = require('../models/user-model');
const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');
const logger = require('../logger');

/**
 * @desc    Register new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = catchAsync(async (req, res, next) => {
  const { error } = validateUser(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  const payload = _.pick(req.body, ['name', 'phone', 'address', 'password', 'image']);
  const user = await authService.register({ ...payload, role: 'customer', verified: true });
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
 * @desc    Login for organization
 * @route   POST /api/auth/login-organization
 * @access  Public
 */

const loginOrganization = catchAsync(async (req, res, next) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return next(new AppError('Phone and password is required.', 400));
  }

  const user = await authService.loginOrganization(phone, password);
  const token = tokenService.generateJwtToken({ id: user._id, role: user.role, verified: user.verified });

  // logg user login information id, name, role, branch and timestamp
  const name = user.name;
  const id = user._id;
  const role = user.role;
  const branch = user?.employee[0]?.branchOffice?.name || 'N/A';

  logger.info(
    `User [${name}] with id [${id}] and role [${role}] logged in at ${new Date().toLocaleString()} from branch [${branch}]`
  );
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

  // Validate phone number using regex for Bangladesh
  const regex = /^\+8801[3-9]{1}[0-9]{8}$/;

  if (!regex.test(phone)) {
    return next(new AppError('Invalid phone number.', 400));
  }

  const otp = otpService.generateOTP();
  // await otpService.sendOTP(phone, otp);

  const expires = Date.now() + process.env.OTP_EXPIRES_IN * 60 * 1000;
  const data = `${phone}.${otp}.${expires}`;
  const hash = otpService.hashOTP(data);

  res.status(200).json({
    hash: `${hash}.${expires}`,
    otp, // For testing purpose
  });
});

/**
 * @desc    Update user profile
 * @route   PATCH /api/auth/profile
 * @access  Private
 */
const updateProfile = catchAsync(async (req, res, next) => {
  const { error } = validateUserUpdate(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));

  const payload = _.pick(req.body, ['name', 'phone', 'address', 'image']);
  const user = await authService.updateProfile(req.user._id, payload);

  res.status(200).json(user);
});

/**
 * @desc    Update password
 * @route   PATCH /api/auth/update-password
 * @access  Private
 */
const updatePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, password } = req.body;

  if (!currentPassword || !password) {
    return next(new AppError('password is required.', 400));
  }

  const payload = _.pick(req.body, ['currentPassword', 'password']);
  const user = await authService.updatePassword(req.user._id, payload);

  const token = tokenService.generateJwtToken({ id: user._id });

  res.status(200).json(token);
});

module.exports = {
  register,
  login,
  loginOrganization,
  getProfile,
  sendOTP,
  updateProfile,
  updatePassword,
};
