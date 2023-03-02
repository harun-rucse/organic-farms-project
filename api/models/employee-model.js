const Joi = require('joi');
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const employeeSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    branchOffice: {
      type: Schema.Types.ObjectId,
      ref: 'Branch',
      required: true,
    },
    salary: {
      type: Number,
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

employeeSchema.pre(/^find/, function (next) {
  this.populate('user', 'name phone address role image verified');
  this.populate('branchOffice', 'name phone address -createdBy -lastUpdatedBy');
  this.populate('createdBy', 'name phone');
  this.populate('lastUpdatedBy', 'name phone');

  next();
});

const validateEmployee = (employee) => {
  const schema = Joi.object({
    user: Joi.string().label('User'),
    branchOffice: Joi.string().label('Branch Office'),
    salary: Joi.number().required().label('Salary'),
  });

  return schema.validate(employee);
};

const validateEmployeeUpdate = (employee) => {
  const schema = Joi.object({
    salary: Joi.number().label('Salary'),
    branchOffice: Joi.string().label('Branch Office'),
  });

  return schema.validate(employee);
};

const Employee = model('Employee', employeeSchema);

module.exports = {
  Employee,
  validateEmployee,
  validateEmployeeUpdate,
};
