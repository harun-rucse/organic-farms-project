const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const revenueSchema = new Schema({
  farmer: {
    type: Schema.Types.ObjectId,
    ref: 'Farmer',
    required: true,
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
  transaction: {
    type: Schema.Types.ObjectId,
    ref: 'Transaction',
    required: true,
  },
  revenueAmount: {
    type: Number,
    required: true,
  },
  branchOffice: {
    type: Schema.Types.ObjectId,
    ref: 'Branch',
    required: true,
  },
});

revenueSchema.pre(/^find/, function (next) {
  this.populate('farmer', 'name phone address image receivePayment -branchOffice -createdBy -lastUpdatedBy');
  this.populate('customer', 'name phone address image');
  this.populate('branchOffice', 'name phone address -createdBy -lastUpdatedBy');

  next();
});

const Revenue = mongoose.model('Revenue', revenueSchema);

module.exports = { Revenue };
