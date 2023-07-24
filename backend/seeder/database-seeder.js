const userSeeds = require('./seeds/user-seeds');
const branchSeeds = require('./seeds/branch-seeds');
const employeeSeeds = require('./seeds/employee-seeds');
const farmerSeeds = require('./seeds/farmer-seeds');
const categorySeeds = require('./seeds/category-seeds');
const subCategorySeeds = require('./seeds/subcategory-seeds');
const productSeeds = require('./seeds/product-seeds');
// const expenseSeeds = require('./seeds/expense-seeds');
const { Order } = require('../models/order-model');
const { Transaction } = require('../models/transaction-model');
const { Revenue } = require('../models/revenue-model');
const { Review } = require('../models/review-model');
const { FarmerCard } = require('../models/farmer-card-model');
const { Expense } = require('../models/expense-model');

const seed = async () => {
  if (process.argv[2] === '--import') {
    await seedAll();
  } else if (process.argv[2] === '--destroy') {
    await dropAll();
  } else if (process.argv[2] === '--refresh' || process.env.NODE_ENV === 'test') {
    await dropAll();
    await seedAll();
  }
  if (process.env.NODE_ENV !== 'test') process.exit();
};

const seedAll = async () => {
  console.log('Seeding...');
  await userSeeds('seed');
  await branchSeeds('seed');
  await employeeSeeds('seed');
  await farmerSeeds('seed');
  await categorySeeds('seed');
  await subCategorySeeds('seed');
  await productSeeds('seed');
  // await expenseSeeds('seed');
  console.log('Seeding complete!');
};

const dropAll = async () => {
  console.log('Dropping...');
  await userSeeds('drop');
  await branchSeeds('drop');
  await employeeSeeds('drop');
  await farmerSeeds('drop');
  await categorySeeds('drop');
  await subCategorySeeds('drop');
  await productSeeds('drop');
  // await expenseSeeds('drop');
  await Order.deleteMany({});
  await Transaction.deleteMany({});
  await Revenue.deleteMany({});
  await Review.deleteMany({});
  await FarmerCard.deleteMany({});
  await Expense.deleteMany({});
  console.log('Dropping complete!');
};

module.exports = { seed };
