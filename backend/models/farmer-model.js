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
    identity: {
      type: String,
      unique: true,
      required: true,
    },
    image: {
      type: String,
      default: 'https://res.cloudinary.com/harun-rucse/image/upload/v1679509502/farmers/default.png',
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

farmerSchema.pre(/^find/, function (next) {
  this.populate('branchOffice', 'name address phone -createdBy -lastUpdatedBy');
  this.populate('createdBy', 'name phone');
  this.populate('lastUpdatedBy', 'name phone');

  next();
});

const validateFarmer = (farmer) => {
  const schema = Joi.object({
    name: Joi.string().required().label('Name'),
    address: Joi.string().required().label('Address'),
    phone: Joi.string()
      .pattern(/^\+8801[3-9]{1}[0-9]{8}$/)
      .messages({ 'string.pattern.base': `Phone number is not valid.` })
      .required(),
    receivePayment: Joi.object({
      type: Joi.string().required().valid('bKash', 'Rocket', 'Nagad', 'Bank').label('Payment Type'),
      number: Joi.string()
        .pattern(/^\+8801[3-9]{1}[0-9]{8}$/)
        .messages({ 'string.pattern.base': `Phone number is not valid.` })
        .required(),
    })
      .or('type', 'number')
      .required()
      .label('Receive Payment'),
    description: Joi.string().label('Description'),
    identity: Joi.string().required().label('Identity'),
    branchOffice: Joi.string().label('Branch Office'),
    image: Joi.string().label('Image'),
  });

  return schema.validate(farmer);
};

const validateFarmerUpdate = (farmer) => {
  const schema = Joi.object({
    name: Joi.string().label('Name'),
    address: Joi.string().label('Address'),
    phone: Joi.string()
      .pattern(/^\+8801[3-9]{1}[0-9]{8}$/)
      .messages({ 'string.pattern.base': `Phone number is not valid.` }),
    receivePayment: Joi.object({
      type: Joi.string().valid('bKash', 'Rocket', 'Nagad', 'Bank').label('Payment Type'),
      number: Joi.string()
        .pattern(/^\+8801[3-9]{1}[0-9]{8}$/)
        .messages({ 'string.pattern.base': `Phone number is not valid.` }),
    })
      .or('type', 'number')
      .label('Receive Payment'),
    description: Joi.string().label('Description'),
    identity: Joi.string().label('Identity'),
    image: Joi.string().label('Image'),
  });

  return schema.validate(farmer);
};

const Farmer = model('Farmer', farmerSchema);

module.exports = {
  Farmer,
  validateFarmer,
  validateFarmerUpdate,
};
