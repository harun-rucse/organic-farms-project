const Joi = require('joi');
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const farmerCardSchema = new Schema(
  {
    farmer: {
      type: Schema.Types.ObjectId,
      ref: 'Farmer',
      unique: true,
      required: true,
    },
    cardNumber: {
      type: String,
      unique: true,
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
  },
  {
    timestamps: true,
  }
);

farmerCardSchema.pre('save', function (next) {
  this.cardNumber = this._id.toString();

  next();
});

farmerCardSchema.pre(/^find/, function (next) {
  this.populate('farmer', 'name address phone image -branchOffice -createdBy -lastUpdatedBy');
  this.populate('branchOffice', 'name address phone -createdBy -lastUpdatedBy');
  this.populate('createdBy', 'name phone');

  next();
});

const validateFarmerCard = (farmerCard) => {
  const schema = Joi.object({
    farmer: Joi.string().required().label('Farmer'),
  });

  return schema.validate(farmerCard);
};

const FarmerCard = model('FarmerCard', farmerCardSchema);

module.exports = {
  FarmerCard,
  validateFarmerCard,
};
