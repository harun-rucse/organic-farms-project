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

farmerSchema.pre(/^find/, function (next) {
  this.populate('branchOffice', 'name address phone');
  this.populate('createdBy', 'name phone');
  this.populate('lastUpdatedBy', 'name phone');

  next();
});

const validateFarmer = (farmer) => {
  const schema = Joi.object({
    name: Joi.string().required().label('Name'),
    address: Joi.string().required().label('Address'),
    phone: Joi.string().min(11).max(14).required().label('Phone Number'),
    receivePayment: Joi.object({
      type: Joi.string().required().valid('bKash', 'Rocket', 'Nagad', 'Bank').label('Payment Type'),
      number: Joi.string().required().min(11).max(14).label('Payment Number'),
    })
      .or('type', 'number')
      .required()
      .label('Receive Payment'),
    description: Joi.string().label('Description'),
    branchOffice: Joi.string().label('Branch Office'),
  });

  return schema.validate(farmer);
};

const validateFarmerUpdate = (farmer) => {
  const schema = Joi.object({
    name: Joi.string().label('Name'),
    address: Joi.string().label('Address'),
    phone: Joi.string().min(11).max(14).label('Phone Number'),
    receivePayment: Joi.object({
      type: Joi.string().valid('bKash', 'Rocket', 'Nagad', 'Bank').label('Payment Type'),
      number: Joi.string().min(11).max(14).label('Payment Number'),
    })
      .or('type', 'number')
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
