const { Expense } = require('../../models/expense-model');

module.exports = async (type) => {
  if (type === 'seed') {
    await Expense.create({
      _id: '64135723e8801b7eb06efe8f',
      category: 'Other',
      amount: 200,
      description: 'Branch official expense',
      date: '2022-12-31T18:00:00.000+00:00',
      branchOffice: '5f9f1b9b8b8c1c2b8c8b8b91',
      createdBy: '5f9f1b9b8b7c1c2b8c8b8b8b',
    });

    await Expense.create({
      _id: '6453b102576a401ede13edbd',
      category: 'Rent',
      amount: 100,
      description: 'Branch rent expense',
      branchOffice: '5f9f1b9b8b8c1c2b8c8b8b91',
      date: '2023-05-04T13:11:44.258+00:00',
      createdBy: '5f9f1b9b8b7c1c2b8c8b8b8b',
    });

    await Expense.create({
      _id: '6453b15f3eb64fa57d0ceb79',
      category: 'Marketing',
      amount: 500,
      description: 'Branch marketing expense',
      branchOffice: '5f9f1b9b8b8c1c2b8c8b8b90',
      date: '2023-05-04T13:11:44.258+00:00',
      createdBy: '5f9f1b9b8b7c1c2b8c8b8b8b',
    });
  } else if (type === 'drop') {
    await Expense.deleteMany({});
  }
};
