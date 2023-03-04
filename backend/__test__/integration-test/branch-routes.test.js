const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const { Branch } = require('../../models/branch-model');
const authenticate = require('../authenticate');

describe('/api/branches', () => {
  describe('GET /', () => {
    let token;

    const exec = () => {
      return request(app).get('/api/branches').set('Authorization', `Bearer ${token}`);
    };

    beforeEach(async () => {
      token = await authenticate();
    });

    it('should return 401 if user not logged in', async () => {
      token = '';
      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('should return all branches', async () => {
      const branches = [
        { name: 'branch1', address: 'test address 1', phone: '01234567891', deliveryFee: 1, costPercentage: 1 },
        { name: 'branch2', address: 'test address 2', phone: '01234567892', deliveryFee: 1, costPercentage: 1 },
      ];
      await Branch.collection.insertMany(branches);

      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body.some((branch) => branch.name === 'branch1')).toBeTruthy();
      expect(res.body.some((branch) => branch.name === 'branch2')).toBeTruthy();
    });
  });

  describe('GET /:id', () => {
    let token;
    let branch;
    let id;

    const exec = () => {
      return request(app).get(`/api/branches/${id}`).set('Authorization', `Bearer ${token}`);
    };

    beforeEach(async () => {
      branch = new Branch({
        name: 'test',
        phone: '01234567890',
        address: 'test address',
        deliveryFee: 1,
        costPercentage: 1,
      });
      await branch.save();

      token = await authenticate('admin');
      id = branch._id;
    });

    it('should return 401 if user not logged in', async () => {
      token = '';
      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('should return 403 if user not an admin', async () => {
      token = await authenticate();

      const res = await exec();

      expect(res.status).toBe(403);
    });

    it('should return a branch if valid id is passed', async () => {
      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', branch.name);
    });

    it('should return 404 if branch not found with id', async () => {
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
    let deliveryFee;
    let costPercentage;

    const exec = () => {
      return request(app)
        .post('/api/branches')
        .send({ name, phone, address, deliveryFee, costPercentage })
        .set('Authorization', `Bearer ${token}`);
    };

    beforeEach(async () => {
      token = await authenticate('admin');
      name = 'test';
      phone = '02154587856';
      address = 'test address';
      deliveryFee = 1;
      costPercentage = 1;
    });

    it('should return 401 if user not logged in', async () => {
      token = '';

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('should return 403 if user not an admin', async () => {
      token = await authenticate();

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

    it('should return 201 if branch is created', async () => {
      const res = await exec();

      const branch = await Branch.findOne({ phone });

      expect(res.status).toBe(201);
      expect(branch).not.toBeNull();
    });
  });

  describe('PATCH /:id', () => {
    let token;
    let branch;
    let newName;
    let phone;
    let id;

    const exec = () => {
      return request(app)
        .patch(`/api/branches/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ name: newName, phone });
    };

    beforeEach(async () => {
      branch = new Branch({
        name: 'test',
        phone: '01234567890',
        address: 'test address',
        deliveryFee: 1,
        costPercentage: 1,
      });
      await branch.save();

      token = await authenticate('admin');
      id = branch._id;
      newName = 'updatedName';
      phone = '12345678901';
    });

    it('should return 401 if user not logged in', async () => {
      token = '';

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('should return 403 if user not an admin', async () => {
      token = await authenticate();

      const res = await exec();

      expect(res.status).toBe(403);
    });

    it('should return 400 if invalid id is passed', async () => {
      id = 1;

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 404 if branch not found with id', async () => {
      id = mongoose.Types.ObjectId();

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it('should return 400 if invalid phone is passed', async () => {
      phone = 'not valid';

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 200 if branch is updated', async () => {
      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', newName);
    });
  });

  describe('DELETE /:id', () => {
    let token;
    let branch;
    let id;

    const exec = () => {
      return request(app).delete(`/api/branches/${id}`).set('Authorization', `Bearer ${token}`);
    };

    beforeEach(async () => {
      branch = new Branch({
        name: 'test',
        phone: '01234567890',
        address: 'test address',
        deliveryFee: 1,
        costPercentage: 1,
      });
      await branch.save();

      token = await authenticate('admin');
      id = branch._id;
    });

    it('should return 401 if user not logged in', async () => {
      token = '';

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('should return 403 if user not an admin', async () => {
      token = await authenticate();

      const res = await exec();

      expect(res.status).toBe(403);
    });

    it('should return 400 if invalid id is passed', async () => {
      id = 1;

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 404 if branch not found with id', async () => {
      id = mongoose.Types.ObjectId();

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it('should return 204 if branch is deleted', async () => {
      const res = await exec();

      expect(res.status).toBe(204);
    });
  });
});
