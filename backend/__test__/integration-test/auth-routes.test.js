const request = require('supertest');
const app = require('../../app');
const { User } = require('../../models/user-model');
const { Employee } = require('../../models/employee-model');
const { Branch } = require('../../models/branch-model');
const tokenService = require('../../services/token-service');

describe('/api/auth', () => {
  describe('POST /login', () => {
    let user;
    let phone;
    let password;

    const exec = () => {
      return request(app).post('/api/auth/login').send({ phone, password });
    };

    beforeEach(async () => {
      user = new User({
        name: 'test',
        phone: '01234567890',
        address: 'test address',
        password: 'password',
      });
      await user.save();

      phone = '01234567890';
      password = 'password';
    });

    it('should return 400 if phone is not provided', async () => {
      phone = '';
      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if password is not provided', async () => {
      password = '';
      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 401 if phone is incorrect', async () => {
      phone = '10000000000';

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('should return 401 if password is incorrect', async () => {
      password = 'incorrect';

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('should return 200 if phone and password are correct', async () => {
      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).not.toBeNull();
    });
  });

  describe('POST /register', () => {
    let name;
    let phone;
    let address;
    let password;

    const exec = () => {
      return request(app).post('/api/auth/register').send({ name, phone, address, password });
    };

    beforeEach(async () => {
      name = 'test';
      phone = '01234567890';
      address = 'test address';
      password = 'password';
    });

    it('should return 400 if name is not provided', async () => {
      name = '';
      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if phone is not provided', async () => {
      phone = '';
      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if phone is not valid', async () => {
      phone = 'invalid';
      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if address is not provided', async () => {
      address = '';
      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if password is not provided', async () => {
      password = '';
      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if password is less than 4 characters', async () => {
      password = '123';
      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if password is more than 20 characters', async () => {
      password = Array(22).join('a');
      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if phone is already exists', async () => {
      await User.create({ name, phone, address, password });
      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 201 for successful register', async () => {
      const res = await exec();

      expect(res.status).toBe(201);
    });
  });

  describe('GET /profile', () => {
    let token;

    const exec = () => {
      return request(app).get('/api/auth/profile').set('Authorization', `Bearer ${token}`);
    };

    beforeEach(async () => {
      const user = new User({
        name: 'test',
        phone: '01234567890',
        address: 'test address',
        password: 'password',
      });
      await user.save();

      token = tokenService.generateJwtToken({ id: user._id });
    });

    it('should return 401 if user is not logged in', async () => {
      token = '';
      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('should return 200 if user is logged in', async () => {
      const res = await exec();

      expect(res.status).toBe(200);
    });

    it('should return user profile if user is logged in', async () => {
      const res = await exec();

      expect(res.body).toHaveProperty('name', 'test');
      expect(res.body).toHaveProperty('phone', '01234567890');
      expect(res.body).toHaveProperty('address', 'test address');
    });

    it('should return branch information if user is employee', async () => {
      await User.deleteMany({});
      const user = await User.create({
        name: 'test user',
        phone: '01234567890',
        address: 'test address',
        password: 'password',
        role: 'branch-manager',
      });

      const branch = await Branch.create({
        name: 'test',
        address: 'test address',
        phone: '01234567890',
        deliveryFee: 1,
        costPercentage: 1,
      });

      await Employee.create({
        user: user._id,
        branchOffice: branch._id,
        salary: 1,
      });

      token = tokenService.generateJwtToken({ id: user._id });

      const res = await exec();

      expect(res.body).toHaveProperty('branch');
      expect(res.body.branch).toHaveProperty('name', 'test');
      expect(res.body.branch).toHaveProperty('address', 'test address');
      expect(res.body.branch).toHaveProperty('phone', '01234567890');
    });
  });
});
