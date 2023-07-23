const { Farmer } = require('../../models/farmer-model');

module.exports = async (type) => {
  if (type === 'seed') {
    await Farmer.create({
      _id: '5f9f1b9b8b9c1c2b8c8b8b91',
      name: 'আমিনুল ইসলাম',
      address: 'গাজীপুর, ঢাকা',
      phone: '+8801311223344',
      identity: '1234567891',
      receivePayment: {
        type: 'Bkash',
        number: '+8801311223344',
      },
      description: 'ধান চাষি',
      image: 'http://res.cloudinary.com/harun-rucse/image/upload/v1689866850/farmers/pksw0vohrzke5k5rtxhk.jpg',
      branchOffice: '5f9f1b9b8b8c1c2b8c8b8b91',
      createdBy: '5f9f1b9b8b7c1c2b8c8b8b91',
    });

    await Farmer.create({
      _id: '64b953571ec8e5af69d3ee68',
      name: 'আনোয়ারা বেগম',
      address: 'কাটাখালী, রাজশাহী',
      phone: '+8801824567890',
      identity: '1234567890',
      receivePayment: {
        type: 'Nagad',
        number: '+8801824567890',
      },
      description: 'সবজি',
      image: 'http://res.cloudinary.com/harun-rucse/image/upload/v1689867100/farmers/ycd9emb6zlig94eofuuw.jpg',
      branchOffice: '5f9f1b9b8b8c1c2b8c8b8b90',
      createdBy: '5f9f1b9b8b7c1c2b8c8b8b8b',
    });

    await Farmer.create({
      _id: '64b953f41ec8e5af69d3ee92',
      name: 'শরিফুল ইসলাম',
      address: 'বায়া, রাজশাহী ',
      phone: '+8801790362665',
      identity: '4375647385',
      receivePayment: {
        type: 'Rocket',
        number: '+8801790362665',
      },
      description: 'সবজি চাষি',
      image: 'http://res.cloudinary.com/harun-rucse/image/upload/v1689867256/farmers/aw3eskktk6sz2zxhbgmg.jpg',
      branchOffice: '5f9f1b9b8b8c1c2b8c8b8b90',
      createdBy: '5f9f1b9b8b7c1c2b8c8b8b8b',
    });
  } else if (type === 'drop') {
    await Farmer.deleteMany({});
  }
};
