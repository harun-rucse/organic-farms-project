const userSeeds = require('./seeds/user-seeds');
const branchSeeds = require('./seeds/branch-seeds');
const employeeSeeds = require('./seeds/employee-seeds');
const farmerSeeds = require('./seeds/farmer-seeds');

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
  await userSeeds('seed');
  await branchSeeds('seed');
  await employeeSeeds('seed');
  await farmerSeeds('seed');
};

const dropAll = async () => {
  await userSeeds('drop');
  await branchSeeds('drop');
  await employeeSeeds('drop');
  await farmerSeeds('drop');
};

module.exports = { seed };
