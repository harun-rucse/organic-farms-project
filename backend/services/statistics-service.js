const { Branch } = require('../models/branch-model');
const { Employee } = require('../models/employee-model');
const { Farmer } = require('../models/farmer-model');
const { User } = require('../models/user-model');
const { Order } = require('../models/order-model');
const { Category } = require('../models/category-model');
const { SubCategory } = require('../models/subcategory-model');
const { Product } = require('../models/product-model');
const { Revenue } = require('../models/revenue-model');
const { Expense } = require('../models/expense-model');
const { Salary } = require('../models/salary-model');
const { Transaction } = require('../models/transaction-model');

const getMonthName = (month) => {
  switch (month) {
    case 1:
      return 'Jan';
    case 2:
      return 'Feb';
    case 3:
      return 'Mar';
    case 4:
      return 'Apr';
    case 5:
      return 'May';
    case 6:
      return 'Jun';
    case 7:
      return 'Jul';
    case 8:
      return 'Aug';
    case 9:
      return 'Sep';
    case 10:
      return 'Oct';
    case 11:
      return 'Nov';
    case 12:
      return 'Dec';
  }
};

const getAllStatsCount = async (filter, month) => {
  let orderFilter = { ...filter };
  if (month) {
    orderFilter.orderPlacedDate = {
      $gte: new Date(new Date().getFullYear(), month - 1, 1),
      $lte: new Date(new Date().getFullYear(), month, 0),
    };
  }

  const [
    nBranch,
    nEmployee,
    nFarmer,
    nCustomer,
    nPlacedOrder,
    nCompletedOrder,
    nCancelledOrder,
    nCategory,
    nSubCategory,
    nProduct,
    nStockOutProduct,
  ] = await Promise.all([
    Branch.countDocuments(),
    Employee.countDocuments(filter),
    Farmer.countDocuments(filter),
    User.countDocuments({ role: 'customer' }),
    Order.countDocuments({ ...orderFilter, orderStatus: 'Placed' }),
    Order.countDocuments({ ...orderFilter, orderStatus: 'Delivered' }),
    Order.countDocuments({ ...orderFilter, orderStatus: 'Cancelled' }),
    Category.countDocuments(),
    SubCategory.countDocuments(),
    Product.countDocuments(filter),
    Product.countDocuments({ ...filter, inStock: 0 }),
  ]);

  return {
    nBranch,
    nEmployee,
    nFarmer,
    nCustomer,
    nPlacedOrder,
    nCompletedOrder,
    nCancelledOrder,
    nCategory,
    nSubCategory,
    nProduct,
    nStockOutProduct,
  };
};

const getAllStatsAmount = async (filter) => {
  const [revenue] = await Revenue.aggregate([
    {
      $match: {
        date: filter.date,
        branchOffice: filter.branchOffice ? filter.branchOffice : { $exists: true },
      },
    },
    {
      $group: {
        _id: filter.branchOffice ? '$branchOffice' : null,
        totalAmount: { $sum: '$revenueAmount' },
      },
    },
  ]);

  // calculate total cost from Expense model
  const [expense] = await Expense.aggregate([
    {
      $match: {
        date: filter.date,
        branchOffice: filter.branchOffice ? filter.branchOffice : { $exists: true },
      },
    },
    {
      $group: {
        _id: filter.branchOffice ? '$branchOffice' : null,
        totalAmount: { $sum: '$amount' },
      },
    },
  ]);

  // calculate total salary from Salary model
  const [salary] = await Salary.aggregate([
    {
      $match: {
        month: getMonthName(filter.date.$lte.getMonth() + 1),
        year: filter.date.$lte.getFullYear().toString(),
        branchOffice: filter.branchOffice ? filter.branchOffice : { $exists: true },
      },
    },
    {
      $group: {
        _id: filter.branchOffice ? '$branchOffice' : null,
        totalAmount: { $sum: '$amount' },
      },
    },
  ]);

  // calculate total payable amount from Transaction model
  const [payable] = await Transaction.aggregate([
    {
      $match: {
        createdAt: filter.date,
        branchOffice: filter.branchOffice ? filter.branchOffice : { $exists: true },
        paymentStatus: 'Unpaid',
        status: { $ne: 'Cancelled' },
      },
    },
    {
      $group: {
        _id: filter.branchOffice ? '$branchOffice' : null,
        totalAmount: { $sum: '$payableAmount' },
      },
    },
  ]);

  // calculate total paid amount from Transaction model
  const [paid] = await Transaction.aggregate([
    {
      $match: {
        createdAt: filter.date,
        branchOffice: filter.branchOffice ? filter.branchOffice : { $exists: true },
        paymentStatus: 'Paid',
        status: { $ne: 'Cancelled' },
      },
    },
    {
      $group: {
        _id: filter.branchOffice ? '$branchOffice' : null,
        totalAmount: { $sum: '$payableAmount' },
      },
    },
  ]);

  return {
    totalRevenue: revenue ? revenue.totalAmount : 0,
    totalExpense: expense ? expense.totalAmount : 0,
    totalSalary: salary ? salary.totalAmount : 0,
    totalPayable: payable ? payable.totalAmount : 0,
    totalPaid: paid ? paid.totalAmount : 0,
  };
};

module.exports = {
  getAllStatsCount,
  getAllStatsAmount,
};
