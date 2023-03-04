const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const generateJwtToken = (payload, option = { expiresIn: process.env.JWT_EXPIRES_IN }) => {
  return jwt.sign(payload, process.env.JWT_SECRET, option);
};

const verifyJwtToken = (token) => {
  return promisify(jwt.verify)(token, process.env.JWT_SECRET);
};

module.exports = {
  generateJwtToken,
  verifyJwtToken,
};
