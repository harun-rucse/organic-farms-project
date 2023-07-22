const { Category } = require('../../models/category-model');

module.exports = async (type) => {
  if (type === 'seed') {
    await Category.create({
      _id: '5f9f1b9b8b9c2c4b8c8b8b90',
      name: 'ফল',
      description: 'ফল',
      image: 'http://res.cloudinary.com/harun-rucse/image/upload/v1689867734/categories/kqkpblkse6v8lyepqzsj.jpg',
      createdBy: '5f9f1b9b8b7c1c2b8c8b8b8b',
    });

    await Category.create({
      _id: '5f9f1b9b8b9c2c4b8c8b8b91',
      name: 'শাক সবজি',
      description: 'টাটকা শাক সবজি',
      image: 'http://res.cloudinary.com/harun-rucse/image/upload/v1689867677/categories/kum0t4ojrg85brizl0ej.jpg',
      createdBy: '5f9f1b9b8b7c1c2b8c8b8b8b',
    });

    await Category.create({
      _id: '64b956101ec8e5af69d3eeeb',
      name: 'ডাল',
      description: 'ডাল',
      image: 'http://res.cloudinary.com/harun-rucse/image/upload/v1689867796/categories/smcdgrceddeisjov5nwj.jpg',
      createdBy: '5f9f1b9b8b7c1c2b8c8b8b8b',
    });

    await Category.create({
      _id: '64b956311ec8e5af69d3eef3',
      name: 'মসলা',
      description: 'মসলা',
      image: 'http://res.cloudinary.com/harun-rucse/image/upload/v1689867829/categories/s9ac8kfgdiqphiwkevxn.jpg',
      createdBy: '5f9f1b9b8b7c1c2b8c8b8b8b',
    });

    await Category.create({
      _id: '64b9567a1ec8e5af69d3eefb',
      name: 'চাউল',
      description: 'চাউল',
      image: 'http://res.cloudinary.com/harun-rucse/image/upload/v1689867902/categories/az2hzxayol2yikyhpo5w.jpg',
      createdBy: '5f9f1b9b8b7c1c2b8c8b8b8b',
    });
  } else if (type === 'drop') {
    await Category.deleteMany({});
  }
};
