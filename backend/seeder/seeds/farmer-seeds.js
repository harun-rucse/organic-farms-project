const { Farmer } = require('../../models/farmer-model');

module.exports = async (type) => {
  if (type === 'seed') {
    await Farmer.create({
      _id: '5f9f1b9b8b9c1c2b8c8b8b90',
      name: 'Farmer 1',
      address: 'Rajshahi, Bangladesh',
      phone: '+8801234567890',
      identity: '1234567890',
      receivePayment: {
        type: 'bKash',
        number: '+8801234567890',
      },
      description: 'Farmer 1 description',
      branchOffice: '5f9f1b9b8b8c1c2b8c8b8b90',
      createdBy: '5f9f1b9b8b7c1c2b8c8b8b90',
    });

    await Farmer.create({
      _id: '5f9f1b9b8b9c1c2b8c8b8b91',
      name: 'Farmer 2',
      address: 'Dhaka, Bangladesh',
      phone: '+8801234567891',
      identity: '1234567891',
      receivePayment: {
        type: 'bKash',
        number: '+8801234567891',
      },
      description: 'Farmer 2 description',
      branchOffice: '5f9f1b9b8b8c1c2b8c8b8b91',
      createdBy: '5f9f1b9b8b7c1c2b8c8b8b91',
    });
  } else if (type === 'drop') {
    await Farmer.deleteMany({});
  }
};
