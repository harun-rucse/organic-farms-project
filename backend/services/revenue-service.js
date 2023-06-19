const { Revenue } = require('../models/revenue-model');
const APIFeatures = require('../utils/api-features');

const getTotalCount = (filter) => {
  return Revenue.countDocuments(filter);
};

const getAllRevenues = (filter = {}, query) => {
  return new APIFeatures(Revenue.find(filter), query).filter().sort().limitFields().paginate().query;
};

const getOneRevenue = (filter) => {
  return Revenue.findOne(filter);
};

const updateOneRevenue = (filter, payload) => {
  return Revenue.findOneAndUpdate(filter, payload, { new: true });
};

const deleteManyRevenues = (filter) => {
  return Revenue.deleteMany(filter);
};

const getRevenueStatistics = (filter) => {
  return Revenue.aggregate([
    {
      $match: filter,
    },
    {
      $group: {
        _id: '$branchOffice',
        totalAmount: { $sum: '$revenueAmount' },
      },
    },
    {
      $lookup: {
        from: 'branches',
        localField: '_id',
        foreignField: '_id',
        as: 'branchOffice',
      },
    },
    {
      $project: {
        _id: 0,
        totalAmount: 1,
        branchOffice: {
          name: 1,
          address: 1,
          phone: 1,
        },
      },
    },
  ]);
};

module.exports = {
  getTotalCount,
  getAllRevenues,
  getOneRevenue,
  updateOneRevenue,
  deleteManyRevenues,
  getRevenueStatistics,
};
