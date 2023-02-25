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
      ref: 'BranchOffice',
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

const validateEmployee = (employee) => {
  const schema = Joi.object({
    user: Joi.string().required().label('User'),
    branchOffice: Joi.string().required().label('Branch Office'),
    salary: Joi.number().required().label('Salary'),
  });

  return schema.validate(employee);
};

const validateEmployeeUpdate = (employee) => {
  const schema = Joi.object({
    salary: Joi.number().label('Salary'),
  });

  return schema.validate(employee);
};

const Employee = model('Employee', employeeSchema);

module.exports = {
  Employee,
  validateEmployee,
  validateEmployeeUpdate,
};
