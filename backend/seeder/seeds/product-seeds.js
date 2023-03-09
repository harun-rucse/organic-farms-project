const productFactory = require('../factories/product-factory');

module.exports = async (type) => {
  if (type === 'seed') {
    await productFactory.seed(50);
  } else if (type === 'drop') {
    await productFactory.drop();
  }
};
