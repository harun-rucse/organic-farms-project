const crypto = require('crypto');
const smsService = require('./sms-service');

const generateOTP = () => {
  return crypto.randomInt(1000, 9999).toString();
};

const hashOTP = (otp) => {
  return crypto.createHash('sha256').update(otp).digest('hex');
};

const verifyOTP = (hashedOtp, otp) => {
  const computedHash = hashOTP(otp);

  return computedHash === hashedOtp;
};

const sendOTP = (phone, otp) => {
  return smsService.sendSMS(phone, `Your OTP is ${otp} and it is valid for ${process.env.OTP_EXPIRES_IN} minutes.`);
};

module.exports = {
  generateOTP,
  hashOTP,
  verifyOTP,
  sendOTP,
};
