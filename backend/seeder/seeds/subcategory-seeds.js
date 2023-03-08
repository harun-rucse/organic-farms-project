const { SubCategory } = require('../../models/subcategory-model');

module.exports = async (type) => {
  if (type === 'seed') {
    await SubCategory.create({
      _id: '5f9f2b9b8b9c2c4b8c8b8b90',
      name: 'Tomato',
      category: '5f9f1b9b8b9c2c4b8c8b8b90',
      createdBy: '5f9f1b9b8b7c1c2b8c8b8b8b',
    });

    await SubCategory.create({
      _id: '5f9f2b9b8b9c2c4b8c8b8b91',
      name: 'Potato',
      category: '5f9f1b9b8b9c2c4b8c8b8b90',
      createdBy: '5f9f1b9b8b7c1c2b8c8b8b8b',
    });
  } else if (type === 'drop') {
    await SubCategory.deleteMany({});
  }
};
