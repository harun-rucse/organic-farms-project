const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const tokenService = require('../../services/token-service');
const config = require('../../config');

describe('generateJwtToken', () => {
  it('returns a valid jwt token', async () => {
    const payload = { _id: mongoose.Types.ObjectId(), role: 'admin' };

    const token = tokenService.generateJwtToken(payload);
    const decoded = jwt.verify(token, config.JWT_SECRET);

    expect(decoded).toMatchObject(payload);
  });
});

describe('verifyJwtToken', () => {
  it('should return a decoded payload', async () => {
    const payload = { _id: mongoose.Types.ObjectId(), role: 'admin' };

    const token = jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRES_IN,
    });

    const decoded = await tokenService.verifyJwtToken(token);

    expect(decoded).toMatchObject(payload);
  });
});
