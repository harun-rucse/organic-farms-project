const crypto = require('crypto');
const smsService = require('./sms-service');
const config = require('../config');

const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

const hashOTP = (otp) => {
  return crypto.createHash('sha256').update(otp).digest('hex');
};

const verifyOTP = (hashedOtp, otp) => {
  const computedHash = hashOTP(otp);

  return computedHash === hashedOtp;
};

const sendOTP = (phone, otp) => {
  return smsService.sendSMS(phone, `Your OTP is ${otp} and it is valid for ${config.OTP_EXPIRES_IN} minutes.`);
};

module.exports = {
  generateOTP,
  hashOTP,
  verifyOTP,
  sendOTP,
};
