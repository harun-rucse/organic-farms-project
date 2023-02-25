const { User } = require('../../models/user-model');

module.exports = async (type) => {
  if (type === 'seed') {
    await User.create({
      _id: '5f9f1b9b8b7c1c2b8c8b8b8b',
      name: 'Admin',
      phone: '01790362665',
      address: 'Rajshahi, Bangladesh',
      password: 'password',
      role: 'admin',
    });

    await User.create({
      _id: '5f9f1b9b8b7c1c2b8c8b8b8c',
      name: 'Branch Manager 1',
      phone: '01790362666',
      address: 'Rajshahi, Bangladesh',
      password: 'password',
      role: 'branch-manager',
    });

    await User.create({
      _id: '5f9f1b9b8b7c1c2b8c8b8b8d',
      name: 'Branch Manager 2',
      phone: '01790362667',
      address: 'Dhaka, Bangladesh',
      password: 'password',
      role: 'branch-manager',
    });

    await User.create({
      _id: '5f9f1b9b8b7c1c2b8c8b8b8e',
      name: 'Farmer 1',
      phone: '01790362668',
      address: 'Rajshahi, Bangladesh',
      password: 'password',
      role: 'farmer',
    });

    await User.create({
      _id: '5f9f1b9b8b7c1c2b8c8b8b8f',
      name: 'Farmer 2',
      phone: '01790362669',
      address: 'Dhaka, Bangladesh',
      password: 'password',
      role: 'farmer',
    });

    await User.create({
      _id: '5f9f1b9b8b7c1c2b8c8b8b90',
      name: 'Office Employee 1',
      phone: '01790362670',
      address: 'Rajshahi, Bangladesh',
      password: 'password',
      role: 'office-employee',
    });

    await User.create({
      _id: '5f9f1b9b8b7c1c2b8c8b8b91',
      name: 'Office Employee 1',
      phone: '01790362671',
      address: 'Dhaka, Bangladesh',
      password: 'password',
      role: 'office-employee',
    });

    await User.create({
      _id: '5f9f1b9b8b7c1c2b8c8b8b92',
      name: 'Warehouse Employee 1',
      phone: '01790362673',
      address: 'Rajshahi, Bangladesh',
      password: 'password',
      role: 'warehouse-employee',
    });

    await User.create({
      _id: '5f9f1b9b8b7c1c2b8c8b8b93',
      name: 'Delivery Person 1',
      phone: '01790362674',
      address: 'Rajshahi, Bangladesh',
      password: 'password',
      role: 'delivery-person',
    });

    await User.create({
      _id: '5f9f1b9b8b7c1c2b8c8b8b94',
      name: 'Customer 1',
      phone: '01790362672',
      address: 'Rajshahi, Bangladesh',
      password: 'password',
      role: 'customer',
    });
  } else if (type === 'drop') {
    await User.deleteMany({});
  }
};
