const Joi = require('joi');
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const subCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
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

subCategorySchema.pre(/^find/, function (next) {
  this.populate('category', 'name image -createdBy -lastUpdatedBy');
  this.populate('createdBy', 'name phone');
  this.populate('lastUpdatedBy', 'name phone');

  next();
});

const validateSubCategory = (subCategory) => {
  const schema = Joi.object({
    name: Joi.string().required().label('Name'),
    category: Joi.string().required().label('Category'),
  });

  return schema.validate(subCategory);
};

const validateSubCategoryUpdate = (subCategory) => {
  const schema = Joi.object({
    name: Joi.string().label('Name'),
  });

  return schema.validate(subCategory);
};

const SubCategory = model('SubCategory', subCategorySchema);

module.exports = {
  SubCategory,
  validateSubCategory,
  validateSubCategoryUpdate,
};
