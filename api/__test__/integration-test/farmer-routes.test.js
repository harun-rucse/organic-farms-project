const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const { Farmer } = require('../../models/farmer-model');
const { User } = require('../../models/user-model');
const { Employee } = require('../../models/employee-model');
const authenticate = require('../authenticate');
const tokenService = require('../../services/token-service');

describe('/api/farmers', () => {
  describe('GET /', () => {
    let token;

    const exec = () => {
      return request(app).get('/api/farmers').set('Authorization', `Bearer ${token}`);
    };

    beforeEach(async () => {
      token = await authenticate('admin');
    });

    it('should return 401 if user not logged in', async () => {
      token = '';
      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('should return 403 if user is a customer', async () => {
      token = await authenticate('customer');

      const res = await exec();

      expect(res.status).toBe(403);
    });

    it('should return 403 if user is a warehouse-employee', async () => {
      token = await authenticate('warehouse-employee');

      const res = await exec();

      expect(res.status).toBe(403);
    });

    it('should return specific farmers associate with this branch if user is branch-manager or office-employee', async () => {
      await User.deleteMany({});
      const user = await User.create({
        name: 'test user',
        phone: '01234567890',
        address: 'test address',
        password: 'password',
        role: 'branch-manager',
      });

      const branchOffice = mongoose.Types.ObjectId();
      await Employee.create({
        user: user._id,
        branchOffice,
        salary: 1,
      });

      token = tokenService.generateJwtToken({ id: user._id });

      const farmers = [
        {
          name: 'farmer1',
          address: 'test address 1',
          phone: '01234567891',
          receivePayment: { type: 'bKash', number: '01254658758' },
          branchOffice,
        },
        {
          name: 'farmer2',
          address: 'test address 2',
          phone: '01234567892',
          receivePayment: { type: 'bKash', number: '01254658759' },
          branchOffice: mongoose.Types.ObjectId(),
        },
      ];
      await Farmer.collection.insertMany(farmers);

      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(1);
      expect(res.body.some((farmer) => farmer.name === 'farmer1')).toBeTruthy();
    });

    it('should return all farmers if user is an admin', async () => {
      const farmers = [
        {
          name: 'farmer1',
          address: 'test address 1',
          phone: '01234567891',
          receivePayment: { type: 'bKash', number: '01254658758' },
          branchOffice: mongoose.Types.ObjectId(),
        },
        {
          name: 'farmer2',
          address: 'test address 2',
          phone: '01234567892',
          receivePayment: { type: 'bKash', number: '01254658759' },
          branchOffice: mongoose.Types.ObjectId(),
        },
      ];
      await Farmer.collection.insertMany(farmers);

      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body.some((farmer) => farmer.name === 'farmer1')).toBeTruthy();
      expect(res.body.some((farmer) => farmer.name === 'farmer2')).toBeTruthy();
    });
  });

  describe('GET /:id', () => {
    let token;
    let farmer;
    let id;
    let branchOffice;

    const exec = () => {
      return request(app).get(`/api/farmers/${id}`).set('Authorization', `Bearer ${token}`);
    };

    beforeEach(async () => {
      branchOffice = mongoose.Types.ObjectId();

      farmer = new Farmer({
        name: 'test',
        phone: '01234567890',
        address: 'test address',
        receivePayment: { type: 'bKash', number: '01254658758' },
        branchOffice,
      });
      await farmer.save();

      token = await authenticate('admin');
      id = farmer._id;
    });

    it('should return 401 if user not logged in', async () => {
      token = '';
      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('should return 403 if user is a customer', async () => {
      token = await authenticate('customer');

      const res = await exec();

      expect(res.status).toBe(403);
    });

    it('should return 403 if user is a warehouse-employee', async () => {
      token = await authenticate('warehouse-employee');

      const res = await exec();

      expect(res.status).toBe(403);
    });

    it('should return 404 if user is a branch-manager or office-employee and farmer is not associated with this branch', async () => {
      await User.deleteMany({});
      const user = await User.create({
        name: 'test user',
        phone: '01234567890',
        address: 'test address',
        password: 'password',
        role: 'branch-manager',
      });

      branchOffice = mongoose.Types.ObjectId();
      await Employee.create({
        user: user._id,
        branchOffice,
        salary: 1,
      });

      token = tokenService.generateJwtToken({ id: user._id });

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it('should return specific farmer if user is a branch-manager or office-employee and farmer is associated with this branch', async () => {
      await User.deleteMany({});
      const user = await User.create({
        name: 'test user',
        phone: '01234567890',
        address: 'test address',
        password: 'password',
        role: 'office-employee',
      });

      await Employee.create({
        user: user._id,
        branchOffice,
        salary: 1,
      });

      token = tokenService.generateJwtToken({ id: user._id });

      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', farmer.name);
    });

    it('should return a farmer if valid id is passed', async () => {
      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', farmer.name);
    });

    it('should return 404 if farmer not found with id', async () => {
      id = mongoose.Types.ObjectId();

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it('should return 404 if invalid id is passed', async () => {
      id = 1;

      const res = await exec();

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Invalid _id: 1');
    });
  });

  describe('POST /', () => {
    let token;
    let name;
    let phone;
    let address;
    let receivePayment;
    let branchOffice;

    const exec = () => {
      return request(app)
        .post('/api/farmers')
        .send({ name, phone, address, receivePayment, branchOffice })
        .set('Authorization', `Bearer ${token}`);
    };

    beforeEach(async () => {
      token = await authenticate('admin');
      name = 'test';
      phone = '02154587856';
      address = 'test address';
      receivePayment = { type: 'bKash', number: '01254658758' };
    });

    it('should return 401 if user not logged in', async () => {
      token = '';

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('should return 403 if user is customer', async () => {
      token = await authenticate('customer');

      const res = await exec();

      expect(res.status).toBe(403);
    });

    it('should return 403 if user is warehouse-employee', async () => {
      token = await authenticate('warehouse-employee');

      const res = await exec();

      expect(res.status).toBe(403);
    });

    it('should return 400 if name is missing', async () => {
      name = '';

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if phone is missing', async () => {
      phone = '';

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if address is missing', async () => {
      address = '';

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if receivePayment is missing', async () => {
      receivePayment = '';

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if receivePayment type is missing', async () => {
      receivePayment.type = '';

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if receivePayment number is missing', async () => {
      receivePayment.number = '';

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if receivePayment number is not valid', async () => {
      receivePayment.number = 'not valid';

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if receivePayment number is less than 11 characters', async () => {
      receivePayment.number = Array(11).join('1');

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if receivePayment number is more than 14 characters', async () => {
      receivePayment.number = Array(16).join('1');

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if receivePayment type is not valid enum', async () => {
      receivePayment.type = 'not valid';

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if phone is not valid', async () => {
      phone = 'not valid';

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 is phone is less than 11 characters', async () => {
      phone = Array(11).join('1');

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 is phone is more than 14 characters', async () => {
      phone = Array(16).join('1');

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if branchOffice is missing for an admin', async () => {
      token = await authenticate('admin');
      branchOffice = '';

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 201 with automatically filled branchOffice if user is a branch-manager or office-employee', async () => {
      await User.deleteMany({});
      const user = await User.create({
        name: 'test user',
        phone: '01234567890',
        address: 'test address',
        password: 'password',
        role: 'office-employee',
      });

      branchOffice = mongoose.Types.ObjectId();
      await Employee.create({
        user: user._id,
        branchOffice,
        salary: 1,
      });

      token = tokenService.generateJwtToken({ id: user._id });

      const res = await exec();

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('branchOffice', branchOffice.toHexString());
      expect(res.body.branchOffice).toBe(branchOffice.toHexString());
    });

    it('should return 201 if farmer is created', async () => {
      branchOffice = mongoose.Types.ObjectId();
      const res = await exec();

      const farmer = await Farmer.findOne({ phone });

      expect(res.status).toBe(201);
      expect(farmer).not.toBeNull();
    });

    it('should return 201 with createdBy field', async () => {
      branchOffice = mongoose.Types.ObjectId();
      const res = await exec();

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('createdBy');
    });
  });

  describe('PATCH /:id', () => {
    let token;
    let farmer;
    let newName;
    let phone;
    let branchOffice;
    let receivePayment;
    let id;

    const exec = () => {
      return request(app)
        .patch(`/api/farmers/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: newName, phone, receivePayment });
    };

    beforeEach(async () => {
      branchOffice = mongoose.Types.ObjectId();
      farmer = new Farmer({
        name: 'test',
        phone: '01234567890',
        address: 'test address',
        receivePayment: { type: 'bKash', number: '01234567890' },
        branchOffice,
      });
      await farmer.save();

      token = await authenticate('admin');
      id = farmer._id;
      newName = 'updatedName';
      phone = '12345678901';
      receivePayment = { number: '12345678900' };
    });

    it('should return 401 if user not logged in', async () => {
      token = '';

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('should return 403 if user is customer', async () => {
      token = await authenticate('customer');

      const res = await exec();

      expect(res.status).toBe(403);
    });

    it('should return 403 if user is warehouse-employee', async () => {
      token = await authenticate('warehouse-employee');

      const res = await exec();

      expect(res.status).toBe(403);
    });

    it('should return 400 if invalid id is passed', async () => {
      id = 1;

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 404 if farmer not found with id', async () => {
      id = mongoose.Types.ObjectId();

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it('should return 400 if invalid phone is passed', async () => {
      phone = 'not valid';

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if invalid receivePayment number is passed', async () => {
      receivePayment.number = 'not valid';

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if invalid receivePayment type is passed', async () => {
      receivePayment.type = 'not valid';

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if receivePayment number is less than 11 characters', async () => {
      receivePayment.number = Array(11).join('1');

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if receivePayment number is more than 14 characters', async () => {
      receivePayment.number = Array(16).join('1');

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if receivePayment type is not bKash or Rocket', async () => {
      receivePayment.type = 'not valid';

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if phone is less than 11 characters', async () => {
      phone = Array(11).join('1');

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 is phone is more than 14 characters', async () => {
      phone = Array(16).join('1');

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 404 if logged in user branchOffice is not same as farmer branchOffice', async () => {
      await User.deleteMany({});
      const user = await User.create({
        name: 'test user',
        phone: '01234567890',
        address: 'test address',
        password: 'password',
        role: 'office-employee',
      });

      branchOffice = mongoose.Types.ObjectId();
      await Employee.create({
        user: user._id,
        branchOffice,
        salary: 1,
      });

      token = tokenService.generateJwtToken({ id: user._id });

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it('should return 200 with lastUpdatedBy field', async () => {
      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('lastUpdatedBy');
    });

    it('should return 200 if farmer is updated', async () => {
      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', newName);
    });
  });

  describe('DELETE /:id', () => {
    let token;
    let farmer;
    let branchOffice;
    let id;

    const exec = () => {
      return request(app).delete(`/api/farmers/${id}`).set('Authorization', `Bearer ${token}`);
    };

    beforeEach(async () => {
      branchOffice = mongoose.Types.ObjectId();
      farmer = new Farmer({
        name: 'test',
        phone: '01234567890',
        address: 'test address',
        receivePayment: { type: 'bKash', number: '01234567890' },
        branchOffice,
      });
      await farmer.save();

      token = await authenticate('admin');
      id = farmer._id;
    });

    it('should return 401 if user not logged in', async () => {
      token = '';

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('should return 403 if user is customer', async () => {
      token = await authenticate('customer');

      const res = await exec();

      expect(res.status).toBe(403);
    });

    it('should return 403 if user is warehouse-employee', async () => {
      token = await authenticate('warehouse-employee');

      const res = await exec();

      expect(res.status).toBe(403);
    });

    it('should return 400 if invalid id is passed', async () => {
      id = 1;

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 404 if farmer not found with id', async () => {
      id = mongoose.Types.ObjectId();

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it('should return 404 if logged in user branchOffice is not same as farmer branchOffice', async () => {
      await User.deleteMany({});
      const user = await User.create({
        name: 'test user',
        phone: '01234567890',
        address: 'test address',
        password: 'password',
        role: 'office-employee',
      });

      branchOffice = mongoose.Types.ObjectId();
      await Employee.create({
        user: user._id,
        branchOffice,
        salary: 1,
      });

      token = tokenService.generateJwtToken({ id: user._id });

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it('should return 204 if farmer is deleted', async () => {
      const res = await exec();

      expect(res.status).toBe(204);
    });
  });
});
