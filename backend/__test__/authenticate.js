const { User } = require('../models/user-model');
const tokenService = require('../services/token-service');

module.exports = async (role = 'customer', verified = true) => {
  await User.deleteMany({});

  const user = new User({
    name: 'test',
    phone: '01234567890',
    address: 'test address',
    password: 'password',
    role,
    verified,
  });
  await user.save();

  return tokenService.generateJwtToken({ id: user._id });
};
