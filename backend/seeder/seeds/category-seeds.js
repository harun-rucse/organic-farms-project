const { Category } = require('../../models/category-model');

module.exports = async (type) => {
  if (type === 'seed') {
    await Category.create({
      _id: '5f9f1b9b8b9c2c4b8c8b8b90',
      name: 'Vegatable',
      description: 'All kinds of vegatables category',
      createdBy: '5f9f1b9b8b7c1c2b8c8b8b8b',
    });

    await Category.create({
      _id: '5f9f1b9b8b9c2c4b8c8b8b91',
      name: 'Fruit',
      description: 'All kinds of fruits category',
      createdBy: '5f9f1b9b8b7c1c2b8c8b8b8b',
    });
  } else if (type === 'drop') {
    await Category.deleteMany({});
  }
};
