const { User } = require('../../models/user-model');

module.exports = async (type) => {
  if (type === 'seed') {
    await User.create({
      _id: '5f9f1b9b8b7c1c2b8c8b8b8b',
      name: 'Admin',
      phone: '+8801790362665',
      address: 'Rajshahi, Bangladesh',
      password: 'password',
      role: 'admin',
      verified: true,
    });

    await User.create({
      _id: '5f9f1b9b8b7c1c2b8c8b8b8c',
      name: 'Branch Manager 1',
      phone: '+8801790362666',
      address: 'Rajshahi, Bangladesh',
      password: 'password',
      role: 'branch-manager',
      verified: true,
    });

    await User.create({
      _id: '5f9f1b9b8b7c1c2b8c8b8b8d',
      name: 'Branch Manager 2',
      phone: '+8801790362667',
      address: 'Dhaka, Bangladesh',
      password: 'password',
      role: 'branch-manager',
      verified: true,
    });

    await User.create({
      _id: '5f9f1b9b8b7c1c2b8c8b8b90',
      name: 'Office Employee 1',
      phone: '+8801790362670',
      address: 'Rajshahi, Bangladesh',
      password: 'password',
      role: 'office-employee',
      verified: true,
    });

    await User.create({
      _id: '5f9f1b9b8b7c1c2b8c8b8b91',
      name: 'Office Employee 1',
      phone: '+8801790362671',
      address: 'Dhaka, Bangladesh',
      password: 'password',
      role: 'office-employee',
      verified: true,
    });

    await User.create({
      _id: '5f9f1b9b8b7c1c2b8c8b8b92',
      name: 'Warehouse Employee 1',
      phone: '+8801790362673',
      address: 'Rajshahi, Bangladesh',
      password: 'password',
      role: 'warehouse-employee',
      verified: true,
    });

    await User.create({
      _id: '5f9f1b9b8b7c1c2b8c8b8b93',
      name: 'Delivery Person 1',
      phone: '+8801790362674',
      address: 'Rajshahi, Bangladesh',
      password: 'password',
      role: 'delivery-person',
      verified: true,
    });

    await User.create({
      _id: '5f9f1b9b8b7c1c2b8c8b8b94',
      name: 'Delivery Person 2',
      phone: '+8801790362675',
      address: 'Dhaka, Bangladesh',
      password: 'password',
      role: 'delivery-person',
      verified: true,
    });

    await User.create({
      _id: '5f9f1b9b8b7c1c2b8c8b8b95',
      name: 'Customer 1',
      phone: '+8801790362672',
      address: 'Rajshahi, Bangladesh',
      password: 'password',
      role: 'customer',
      verified: true,
    });
  } else if (type === 'drop') {
    await User.deleteMany({});
  }
};
