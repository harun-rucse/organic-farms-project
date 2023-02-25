const Joi = require('joi');
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const branchSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      unique: true,
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
    deliveryFee: {
      type: Number,
      required: true,
    },
    costPercentage: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const validateBranch = (branch) => {
  const schema = Joi.object({
    name: Joi.string().required().label('Name'),
    address: Joi.string().required().label('Address'),
    phone: Joi.string().min(11).max(14).required().label('Phone Number'),
    deliveryFee: Joi.number().min(1).required().label('Delivery Fee'),
    costPercentage: Joi.number().min(1).required().label('Cost Percentage'),
  });

  return schema.validate(branch);
};

const validateBranchUpdate = (branch) => {
  const schema = Joi.object({
    name: Joi.string().label('Name'),
    address: Joi.string().label('Address'),
    phone: Joi.string().min(11).max(14).label('Phone Number'),
    deliveryFee: Joi.number().min(1).label('Delivery Fee'),
    costPercentage: Joi.number().min(1).label('Cost Percentage'),
  });

  return schema.validate(branch);
};

const Branch = model('Branch', branchSchema);

module.exports = {
  Branch,
  validateBranch,
  validateBranchUpdate,
};
