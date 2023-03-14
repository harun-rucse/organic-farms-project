const { Employee } = require('../../models/employee-model');

module.exports = async (type) => {
  if (type === 'seed') {
    await Employee.create({
      _id: '5f9f1b7b8b8c1c2b8c8b8b90',
      user: '5f9f1b9b8b7c1c2b8c8b8b8c',
      role: 'branch-manager',
      branchOffice: '5f9f1b9b8b8c1c2b8c8b8b90',
      salary: 10000,
      createdBy: '5f9f1b9b8b7c1c2b8c8b8b8b',
    });

    await Employee.create({
      _id: '5f9f1b7b8b8c1c2b8c8b8b91',
      user: '5f9f1b9b8b7c1c2b8c8b8b8d',
      role: 'branch-manager',
      branchOffice: '5f9f1b9b8b8c1c2b8c8b8b91',
      salary: 12000,
      createdBy: '5f9f1b9b8b7c1c2b8c8b8b8b',
    });

    await Employee.create({
      _id: '5f9f1b7b8b8c1c2b8c8b8b92',
      user: '5f9f1b9b8b7c1c2b8c8b8b90',
      role: 'office-employee',
      branchOffice: '5f9f1b9b8b8c1c2b8c8b8b90',
      salary: 8000,
      createdBy: '5f9f1b9b8b7c1c2b8c8b8b8c',
    });

    await Employee.create({
      _id: '5f9f1b7b8b8c1c2b8c8b8b93',
      user: '5f9f1b9b8b7c1c2b8c8b8b91',
      role: 'office-employee',
      branchOffice: '5f9f1b9b8b8c1c2b8c8b8b91',
      salary: 8000,
      createdBy: '5f9f1b9b8b7c1c2b8c8b8b8d',
    });

    await Employee.create({
      _id: '5f9f1b7b8b8c1c2b8c8b8b94',
      user: '5f9f1b9b8b7c1c2b8c8b8b92',
      role: 'warehouse-employee',
      branchOffice: '5f9f1b9b8b8c1c2b8c8b8b90',
      salary: 6000,
      createdBy: '5f9f1b9b8b7c1c2b8c8b8b8c',
    });

    await Employee.create({
      _id: '5f9f1b7b8b8c1c2b8c8b8b95',
      user: '5f9f1b9b8b7c1c2b8c8b8b93',
      role: 'delivery-person',
      branchOffice: '5f9f1b9b8b8c1c2b8c8b8b90',
      salary: 5000,
      createdBy: '5f9f1b9b8b7c1c2b8c8b8b8c',
    });
    await Employee.create({
      _id: '5f9f1b7b8b8c1c2b8c8b8b96',
      user: '5f9f1b9b8b7c1c2b8c8b8b94',
      role: 'delivery-person',
      branchOffice: '5f9f1b9b8b8c1c2b8c8b8b91',
      salary: 5000,
      createdBy: '5f9f1b9b8b7c1c2b8c8b8b8c',
    });
  } else if (type === 'drop') {
    await Employee.deleteMany({});
  }
};
