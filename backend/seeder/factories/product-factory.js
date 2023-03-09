const { faker } = require('@faker-js/faker');
const { Product } = require('../../models/product-model');
const seederFactory = require('./seeder-factory');

const seed = async (quantity = 1) => {
  const productData = [];
  const farmers = ['5f9f1b9b8b9c1c2b8c8b8b90', '5f9f1b9b8b9c1c2b8c8b8b91'];
  const branchOffices = ['5f9f1b9b8b8c1c2b8c8b8b90', '5f9f1b9b8b8c1c2b8c8b8b91'];

  for (let i = 0; i < quantity; i++) {
    const randomIndex = faker.datatype.number({ min: 0, max: 1 });

    const name = `${faker.commerce.productName()}-${i}`;
    const subcategory = faker.helpers.arrayElement([
      '5f9f2b9b8b9c2c4b8c8b8b90',
      '5f9f2b9b8b9c2c4b8c8b8b91',
      '5f9f2b9b8b9c2c4b8c8b8b92',
      '5f9f2b9b8b9c2c4b8c8b8b93',
      '5f9f2b9b8b9c2c4b8c8b8b94',
      '5f9f2b9b8b9c2c4b8c8b8b95',
      '5f9f2b9b8b9c2c4b8c8b8b96',
    ]);
    const price = faker.commerce.price();
    const description = faker.lorem.paragraph();
    const minimumOrder = faker.datatype.number({ min: 10, max: 100 });
    const maximumOrder = faker.datatype.number({ min: 100, max: 1000 });
    const maxDeliveryDays = faker.datatype.number({ min: 1, max: 10 });
    const farmer = farmers[randomIndex];
    const inStock = faker.datatype.number({ min: 10, max: 1000 });
    const ratingQty = faker.datatype.number({ min: 0, max: 100 });
    const ratingAvg = faker.datatype.number({ min: 0, max: 5 });
    const branchOffice = branchOffices[randomIndex];

    const obj = {
      name,
      subcategory,
      price,
      description,
      minimumOrder,
      maximumOrder,
      maxDeliveryDays,
      farmer,
      inStock,
      ratingQty,
      ratingAvg,
      branchOffice,
    };

    productData.push(obj);
  }
  await seederFactory.seedModel(Product, productData);
};

const drop = async () => {
  await seederFactory.dropCollection(Product);
};

module.exports = {
  seed,
  drop,
};
