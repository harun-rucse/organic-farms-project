const Joi = require('joi');
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const transactionSchema = new Schema(
  {
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
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: Number,
      },
    ],
    totalAmount: Number,
    paymentMethod: {
      type: String,
      enum: ['Bkash', 'Rocket', 'Nagad', 'Bank'],
      default: 'Bkash',
    },
    paymentStatus: {
      type: String,
      enum: ['Paid', 'Unpaid'],
      default: 'Unpaid',
    },
    paymentDate: Date,
    orderStatus: {
      type: String,
      enum: ['Placed', 'Cancelled'],
      default: 'Placed',
    },
    branchOffice: {
      type: Schema.Types.ObjectId,
      ref: 'Branch',
      required: true,
    },
    lastUpdatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const validateTransactionUpdate = (transaction) => {
  const schema = Joi.object({
    paymentMethod: Joi.string().valid('Bkash', 'Rocket', 'Nagad', 'Bank'),
    paymentStatus: Joi.string().valid('Paid', 'Unpaid'),
  });

  return schema.validate(transaction);
};

const Transaction = model('Transaction', transactionSchema);

module.exports = {
  Transaction,
  validateTransactionUpdate,
};
