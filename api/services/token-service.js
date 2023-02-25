const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const config = require('../config');

const generateJwtToken = (payload, option = { expiresIn: config.JWT_EXPIRES_IN }) => {
  return jwt.sign(payload, config.JWT_SECRET, option);
};

const verifyJwtToken = (token) => {
  return promisify(jwt.verify)(token, config.JWT_SECRET);
};

module.exports = {
  generateJwtToken,
  verifyJwtToken,
};
