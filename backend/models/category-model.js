const Joi = require('joi');
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    description: String,
    image: {
      type: String,
      default: 'https://res.cloudinary.com/harun-rucse/image/upload/v1679509376/categories/default-icon.png',
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

categorySchema.pre(/^find/, function (next) {
  this.populate('createdBy', 'name phone');
  this.populate('lastUpdatedBy', 'name phone');

  next();
});

const validateCategory = (category) => {
  const schema = Joi.object({
    name: Joi.string().required().label('Name'),
    description: Joi.string().label('Description'),
    image: Joi.string().label('Image'),
  });

  return schema.validate(category);
};

const validateCategoryUpdate = (category) => {
  const schema = Joi.object({
    name: Joi.string().label('Name'),
    description: Joi.string().label('Description'),
    image: Joi.string().label('Image'),
  });

  return schema.validate(category);
};

const Category = model('Category', categorySchema);

module.exports = {
  Category,
  validateCategory,
  validateCategoryUpdate,
};
