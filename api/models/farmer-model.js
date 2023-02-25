const Joi = require('joi');
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const farmerSchema = new Schema(
  {
    name: {
      type: String,
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
    receivePayment: {
      type: {
        type: String,
        enum: ['bKash', 'Rocket', 'Nagad', 'Bank'],
      },
      number: {
        type: String,
        required: true,
      },
    },
    description: String,
    branchOffice: {
      type: Schema.Types.ObjectId,
      ref: 'BranchOffice',
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

const validateFarmer = (farmer) => {
  const schema = Joi.object({
    name: Joi.string().required().label('Name'),
    address: Joi.string().required().label('Address'),
    phone: Joi.string().min(11).max(14).required().label('Phone Number'),
    receivePayment: Joi.object({
      type: Joi.string().required().label('Payment Type'),
      number: Joi.string().required().label('Payment Number'),
    })
      .required()
      .label('Receive Payment'),
    description: Joi.string().label('Description'),
    branchOffice: Joi.string().required().label('Branch Office'),
  });

  return schema.validate(farmer);
};

const validateFarmerUpdate = (farmer) => {
  const schema = Joi.object({
    name: Joi.string().label('Name'),
    address: Joi.string().label('Address'),
    phone: Joi.string().min(11).max(14).label('Phone Number'),
    receivePayment: Joi.object({
      type: Joi.string().label('Payment Type'),
      number: Joi.string().label('Payment Number'),
    })
      .required()
      .label('Receive Payment'),
    description: Joi.string().label('Description'),
  });

  return schema.validate(farmer);
};

const Farmer = model('Farmer', farmerSchema);

module.exports = {
  Farmer,
  validateFarmer,
  validateFarmerUpdate,
};
