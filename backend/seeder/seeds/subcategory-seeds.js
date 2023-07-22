const { SubCategory } = require('../../models/subcategory-model');

module.exports = async (type) => {
  if (type === 'seed') {
    await SubCategory.create({
      _id: '64b956e71ec8e5af69d3ef77',
      name: 'বেগুন',
      category: '5f9f1b9b8b9c2c4b8c8b8b91',
      createdBy: '5f9f1b9b8b7c1c2b8c8b8b8b',
    });

    await SubCategory.create({
      _id: '64b956f21ec8e5af69d3ef7f',
      name: 'পটল',
      category: '5f9f1b9b8b9c2c4b8c8b8b91',
      createdBy: '5f9f1b9b8b7c1c2b8c8b8b8b',
    });

    await SubCategory.create({
      _id: '64b956fc1ec8e5af69d3ef87',
      name: 'লাউ',
      category: '5f9f1b9b8b9c2c4b8c8b8b91',
      createdBy: '5f9f1b9b8b7c1c2b8c8b8b8b',
    });

    await SubCategory.create({
      _id: '64b9570b1ec8e5af69d3ef8f',
      name: 'শসা',
      category: '5f9f1b9b8b9c2c4b8c8b8b91',
      createdBy: '5f9f1b9b8b7c1c2b8c8b8b8b',
    });

    await SubCategory.create({
      _id: '64b957341ec8e5af69d3ef97',
      name: 'আম',
      category: '5f9f1b9b8b9c2c4b8c8b8b90',
      createdBy: '5f9f1b9b8b7c1c2b8c8b8b8b',
    });

    await SubCategory.create({
      _id: '64b957451ec8e5af69d3ef9f',
      name: 'কাঁঠাল',
      category: '5f9f1b9b8b9c2c4b8c8b8b90',
      createdBy: '5f9f1b9b8b7c1c2b8c8b8b8b',
    });

    await SubCategory.create({
      _id: '64b957671ec8e5af69d3efa7',
      name: 'জিরা চাউল',
      category: '64b9567a1ec8e5af69d3eefb',
      createdBy: '5f9f1b9b8b7c1c2b8c8b8b8b',
    });

    await SubCategory.create({
      _id: '64b957761ec8e5af69d3efaf',
      name: 'বাসমতি চাউল',
      category: '64b9567a1ec8e5af69d3eefb',
      createdBy: '5f9f1b9b8b7c1c2b8c8b8b8b',
    });

    await SubCategory.create({
      _id: '64b9578c1ec8e5af69d3efb7',
      name: 'পিয়াজ ',
      category: '64b956311ec8e5af69d3eef3',
      createdBy: '5f9f1b9b8b7c1c2b8c8b8b8b',
    });

    await SubCategory.create({
      _id: '64b9579b1ec8e5af69d3efbf',
      name: 'রসুন',
      category: '64b956311ec8e5af69d3eef3',
      createdBy: '5f9f1b9b8b7c1c2b8c8b8b8b',
    });

    await SubCategory.create({
      _id: '64b957b21ec8e5af69d3efc7',
      name: 'আদা',
      category: '64b956311ec8e5af69d3eef3',
      createdBy: '5f9f1b9b8b7c1c2b8c8b8b8b',
    });
  } else if (type === 'drop') {
    await SubCategory.deleteMany({});
  }
};
