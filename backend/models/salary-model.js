const Joi = require('joi');
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const salarySchema = new Schema(
  {
    month: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    employee: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    branchOffice: {
      type: Schema.Types.ObjectId,
      ref: 'Branch',
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ['Cash', 'Bank'],
    },
    amount: Number,
    status: {
      type: String,
      required: true,
      enum: ['Paid', 'Unpaid'],
    },
    paymentDate: {
      type: Date,
      default: Date.now,
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

salarySchema.index({ employee: 1, month: 1, year: 1 }, { unique: true });

salarySchema.pre(/^find/, function (next) {
  this.populate('employee', '-salary -branchOffice -createdBy -lastUpdatedBy -createdAt -updatedAt');
  this.populate('branchOffice', 'name address phone -createdBy -lastUpdatedBy');
  this.populate('createdBy', 'name phone');
  this.populate('lastUpdatedBy', 'name phone');

  next();
});

const validateSalary = (salary) => {
  const schema = Joi.object({
    month: Joi.string()
      .required()
      .valid('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec')
      .label('Month'),
    year: Joi.string()
      .required()
      .pattern(/202[3-9]{1}|20[3-9]{1}[0-9]{1}|21[0-9]{2}$/)
      .messages({ 'string.pattern.base': `Year must be between 2023 to 2199.` }),
    employee: Joi.string().required().label('Employee'),
    paymentMethod: Joi.string().required().valid('Cash', 'Bank').label('Payment Method'),
    status: Joi.string().required().valid('Paid', 'Unpaid').label('Status'),
  });

  return schema.validate(salary);
};

const validateSalaryUpdate = (salary) => {
  const schema = Joi.object({
    month: Joi.string()
      .valid('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec')
      .label('Month'),
    year: Joi.string()
      .required()
      .pattern(/202[3-9]{1}|20[3-9]{1}[0-9]{1}|21[0-9]{2}$/)
      .messages({ 'string.pattern.base': `Year must be between 2023 to 2199.` }),
    paymentMethod: Joi.string().valid('Cash', 'Bank').label('Payment Method'),
    status: Joi.string().valid('Paid', 'Unpaid').label('Status'),
  });

  return schema.validate(salary);
};

const Salary = model('Salary', salarySchema);

module.exports = {
  Salary,
  validateSalary,
  validateSalaryUpdate,
};
