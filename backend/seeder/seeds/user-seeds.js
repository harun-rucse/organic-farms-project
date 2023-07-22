const { User } = require('../../models/user-model');

module.exports = async (type) => {
  if (type === 'seed') {
    await User.create({
      _id: '5f9f1b9b8b7c1c2b8c8b8b8b',
      name: 'Admin',
      phone: '+8801790362665',
      address: 'Rajshahi, Bangladesh',
      password: 'password',
      image: 'https://res.cloudinary.com/harun-rucse/image/upload/v1679509330/users/default.png',
      role: 'admin',
      verified: true,
    });

    await User.create({
      _id: '5f9f1b9b8b7c1c2b8c8b8b8c',
      name: 'Mr. Asif',
      phone: '+8801790362666',
      address: 'Rajshahi, Bangladesh',
      password: 'password',
      image: 'http://res.cloudinary.com/harun-rucse/image/upload/v1689866024/employees/psqvhel56logmpeie9w3.jpg',
      role: 'branch-manager',
      verified: true,
    });

    await User.create({
      _id: '5f9f1b9b8b7c1c2b8c8b8b8d',
      name: 'Mr. Khairul Bashar',
      phone: '+8801790362667',
      address: 'Dhaka, Bangladesh',
      password: 'password',
      image: 'http://res.cloudinary.com/harun-rucse/image/upload/v1689865953/employees/df4p7l4sti9xalula7hi.jpg',
      role: 'branch-manager',
      verified: true,
    });

    await User.create({
      _id: '5f9f1b9b8b7c1c2b8c8b8b90',
      name: 'Mr. Mamun',
      phone: '+8801790362670',
      address: 'Rajshahi, Bangladesh',
      password: 'password',
      image: 'http://res.cloudinary.com/harun-rucse/image/upload/v1689865898/employees/rivriggfvapsi7apua61.jpg',
      role: 'office-employee',
      verified: true,
    });

    await User.create({
      _id: '5f9f1b9b8b7c1c2b8c8b8b91',
      name: 'Mr. Shihab Uddin',
      phone: '+8801790362671',
      address: 'Dhaka, Bangladesh',
      password: 'password',
      image: 'http://res.cloudinary.com/harun-rucse/image/upload/v1689865774/employees/aspqvfeahijyhvtxl6id.jpg',
      role: 'office-employee',
      verified: true,
    });

    await User.create({
      _id: '5f9f1b9b8b7c1c2b8c8b8b92',
      name: 'Mr. Rakib',
      phone: '+8801790362673',
      address: 'Rajshahi, Bangladesh',
      password: 'password',
      image: 'http://res.cloudinary.com/harun-rucse/image/upload/v1689865739/employees/zexhxzm0z1stnof0pjc6.jpg',
      role: 'warehouse-employee',
      verified: true,
    });

    await User.create({
      _id: '5f9f1b9b8b7c1c2b8c8b8b93',
      name: 'Selim Reja',
      phone: '+8801790362674',
      address: 'Rajshahi, Bangladesh',
      password: 'password',
      image: 'http://res.cloudinary.com/harun-rucse/image/upload/v1689865698/employees/oztsjptpqvfq6zj9p5lf.jpg',
      role: 'delivery-person',
      verified: true,
    });

    await User.create({
      _id: '5f9f1b9b8b7c1c2b8c8b8b94',
      name: 'Abdur Rahim',
      phone: '+8801790362675',
      address: 'Dhaka, Bangladesh',
      password: 'password',
      image: 'http://res.cloudinary.com/harun-rucse/image/upload/v1689865657/employees/kihuo4ozbadrduw9fhly.jpg',
      role: 'delivery-person',
      verified: true,
    });

    await User.create({
      _id: '5f9f1b9b8b7c1c2b8c8b8b95',
      name: 'মো: আশরাফুল ইসলাম',
      phone: '+8801790362672',
      address: 'Rajshahi, Bangladesh',
      password: 'password',
      image: 'http://res.cloudinary.com/harun-rucse/image/upload/v1689866323/users/a2ngl3vmj8is10gszmuu.jpg',
      role: 'customer',
      verified: true,
    });

    await User.create({
      _id: '64b9509a1ec8e5af69d3edfe',
      name: 'মো: সায়েম',
      phone: '+8801654234544',
      address: 'বিনোদপুর, রাজশাহী',
      password: 'password',
      image: 'http://res.cloudinary.com/harun-rucse/image/upload/v1689866458/users/t910smhuzu77dooemjyc.jpg',
      role: 'customer',
      verified: true,
    });
  } else if (type === 'drop') {
    await User.deleteMany({});
  }
};
