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
    icon: {
      type: String,
      default: 'default-icon.jpeg',
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
    icon: Joi.string().label('Icon'),
  });

  return schema.validate(category);
};

const validateCategoryUpdate = (category) => {
  const schema = Joi.object({
    name: Joi.string().label('Name'),
    description: Joi.string().label('Description'),
    icon: Joi.string().label('Icon'),
  });

  return schema.validate(category);
};

const Category = model('Category', categorySchema);

module.exports = {
  Category,
  validateCategory,
  validateCategoryUpdate,
};
