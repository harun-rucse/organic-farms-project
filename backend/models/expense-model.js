const Joi = require('joi');
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const expenseSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
      enum: ['Operations', 'Marketing', 'Rent', 'Transport', 'Utility', 'Other'],
    },
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    branchOffice: {
      type: Schema.Types.ObjectId,
      ref: 'Branch',
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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

expenseSchema.pre(/^find/, function (next) {
  this.populate('branchOffice', 'name address phone -createdBy -lastUpdatedBy');
  this.populate('createdBy', 'name phone image');
  this.populate('lastUpdatedBy', 'name phone image');

  next();
});

const validateExpense = (expense) => {
  const schema = Joi.object({
    category: Joi.string()
      .required()
      .valid('Operations', 'Marketing', 'Rent', 'Transport', 'Utility', 'Other')
      .label('Category'),
    amount: Joi.number().required().min(1).label('Amount'),
    description: Joi.string().required().min(3).max(255).label('Description'),
    date: Joi.date().required().label('Date'),
    branchOffice: Joi.string().label('Branch Office'),
  });

  return schema.validate(expense);
};

const validateExpenseUpdate = (expense) => {
  const schema = Joi.object({
    category: Joi.string().valid('Operations', 'Marketing', 'Rent', 'Transport', 'Utility', 'Other').label('Category'),
    amount: Joi.number().min(1).label('Amount'),
    description: Joi.string().min(3).max(255).label('Description'),
    date: Joi.date().label('Date'),
  });

  return schema.validate(expense);
};

const Expense = model('Expense', expenseSchema);

module.exports = {
  Expense,
  validateExpense,
  validateExpenseUpdate,
};
