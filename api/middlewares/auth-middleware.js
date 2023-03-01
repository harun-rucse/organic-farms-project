const userService = require('../services/user-service');
const tokenService = require('../services/token-service');
const otpService = require('../services/otp-service');
const AppError = require('../utils/app-error');
const catchAsync = require('../utils/catch-async');

const auth = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in! Please log in to get access.', 401));
  }

  // 2) Verification token
  const decoded = await tokenService.verifyJwtToken(token);

  // 3) Check if user still exists
  const currentUser = await userService.getOneUser({ _id: decoded.id });
  if (!currentUser) {
    return next(new AppError('The user belonging to this token does no longer exist.', 401));
  }

  // 4) Check if user changed password after the token was issued
  if (currentUser.passwordChangeAfter(decoded.iat)) {
    return next(new AppError('User recently changed password! Please log in again.', 401));
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = { ...currentUser._doc, branchOffice: currentUser.employee[0]?.branchOffice };

  next();
});

const verified = (req, res, next) => {
  if (req.user.verified) return next();

  return next(new AppError('Your account is not verified.', 403));
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }

    next();
  };
};

const verifyOTP = (req, res, next) => {
  const { otp, hash, phone } = req.body;

  if (!otp || !hash || !phone) {
    return next(new AppError('OTP is required.', 400));
  }

  const [hashedOtp, expires] = hash.split('.');
  if (Date.now() > expires) {
    return next(new AppError('OTP has expired.', 400));
  }

  const data = `${phone}.${otp}.${expires}`;
  const isValid = otpService.verifyOTP(hashedOtp, data);
  if (!isValid) {
    return next(new AppError('OTP is invalid.', 400));
  }

  // Remove otp and hash from body
  delete req.body.otp;
  delete req.body.hash;

  next();
};

module.exports = { auth, verified, restrictTo, verifyOTP };
