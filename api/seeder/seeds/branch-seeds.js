const { Branch } = require('../../models/branch-model');

module.exports = async (type) => {
  if (type === 'seed') {
    await Branch.create({
      _id: '5f9f1b9b8b8c1c2b8c8b8b90',
      name: 'Rajshahi Branch Office',
      address: 'Rajshahi, Bangladesh',
      phone: '01741551374',
      createdBy: '5f9f1b9b8b7c1c2b8c8b8b8b',
      deliveryFee: 100,
      costPercentage: 10,
    });

    await Branch.create({
      _id: '5f9f1b9b8b8c1c2b8c8b8b91',
      name: 'Dhaka Branch Office',
      address: 'Dhaka, Bangladesh',
      phone: '01741551375',
      createdBy: '5f9f1b9b8b7c1c2b8c8b8b8b',
      deliveryFee: 100,
      costPercentage: 10,
    });
  } else if (type === 'drop') {
    await Branch.deleteMany({});
  }
};
