const request = require('supertest');
const { User } = require('../../models/user-model');
const app = require('../../app');
const tokenService = require('../../services/token-service');
const authenticate = require('../authenticate');

describe('auth middleware', () => {
  describe('auth', () => {
    let token;
    let user;

    const exec = () => {
      return request(app).get('/api/branches').set('Authorization', `Bearer ${token}`);
    };

    beforeEach(async () => {
      user = new User({
        name: 'test',
        phone: '01234567890',
        address: 'test address',
        password: 'password',
      });
      await user.save();

      token = tokenService.generateJwtToken({ id: user._id });
    });

    it('should return 401 if token is not provided', async () => {
      token = '';

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('should return 400 if JWT token is invalid', async () => {
      token = 'invalid token';

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 401 if JWT token is expired', async () => {
      token = tokenService.generateJwtToken({ id: user._id }, { expiresIn: '1ms' });

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('should return 401 if user belonging to this token does no longer exist', async () => {
      await User.deleteOne({ phone: user.phone });

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('should return 401 if user changed password after the token was issued', async () => {
      user.passwordChangeAt = Date.now() + 2000;
      await user.save();

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('should return 200 if token is valid', async () => {
      const res = await exec();

      expect(res.status).toBe(200);
    });
  });

  describe('restrictTo', () => {
    let token;

    const exec = () => {
      return request(app)
        .post('/api/branches')
        .send({ name: 'test', address: 'test address', phone: '10000000000', deliveryFee: 1, costPercentage: 1 })
        .set('Authorization', `Bearer ${token}`);
    };

    beforeEach(async () => {
      token = await authenticate('admin');
    });

    it('should return 403 if role is not an admin', async () => {
      token = await authenticate();

      const res = await exec();

      expect(res.status).toBe(403);
    });

    it('should return 201 if role is admin', async () => {
      const res = await exec();

      expect(res.status).toBe(201);
    });
  });
});
