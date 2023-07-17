const Joi = require('joi');
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    subcategory: {
      type: Schema.Types.ObjectId,
      ref: 'SubCategory',
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: String,
    minimumOrder: {
      type: Number,
      required: true,
    },
    maximumOrder: {
      type: Number,
      required: true,
    },
    maxDeliveryDays: {
      type: Number,
      required: true,
    },
    farmer: {
      type: Schema.Types.ObjectId,
      ref: 'Farmer',
      required: true,
    },
    ratingQty: {
      type: Number,
      default: 0,
    },
    ratingAvg: {
      type: Number,
      default: 0,
    },
    inStock: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
      default: ['https://res.cloudinary.com/harun-rucse/image/upload/v1679509832/products/default-product.png'],
    },
    active: {
      type: Boolean,
      default: true,
    },
    branchOffice: {
      type: Schema.Types.ObjectId,
      ref: 'Branch',
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

productSchema.index({ name: 1, farmer: 1 }, { unique: true });

productSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'product',
  localField: '_id',
});

productSchema.pre(/^find/, function (next) {
  this.populate('subcategory', 'name category -createdBy -lastUpdatedBy');
  this.populate('farmer', 'name phone address -createdBy -branchOffice -lastUpdatedBy');
  this.populate('branchOffice', 'name phone address deliveryFee -createdBy -lastUpdatedBy');
  this.populate('createdBy', 'name phone');
  this.populate('lastUpdatedBy', 'name phone');

  next();
});

productSchema.pre(/^findOne/, function (next) {
  this.populate('reviews', 'review rating createdAt -product -branchOffice');

  next();
});

const validateProduct = (product) => {
  const schema = Joi.object({
    name: Joi.string().required().label('Name'),
    subcategory: Joi.string().required().label('Sub Category'),
    price: Joi.number().min(1).required().label('Price'),
    description: Joi.string().label('Description'),
    minimumOrder: Joi.number().required().label('Minimum Order'),
    maximumOrder: Joi.number().required().label('Maximum Order'),
    maxDeliveryDays: Joi.number().required().label('Maximum Delivery Days'),
    farmer: Joi.string().required().label('Farmer'),
    ratingQty: Joi.number().label('Rating Quantity'),
    ratingAvg: Joi.number().label('Rating Average'),
    inStock: Joi.number().required().label('In Stock'),
    images: Joi.array().label('Images'),
    active: Joi.boolean().label('Active'),
    branchOffice: Joi.string().label('Branch Office'),
  });

  return schema.validate(product);
};

const validateProductUpdate = (product) => {
  const schema = Joi.object({
    name: Joi.string().label('Name'),
    subcategory: Joi.string().label('Sub Category'),
    price: Joi.number().min(1).label('Price'),
    description: Joi.string().label('Description'),
    minimumOrder: Joi.number().label('Minimum Order'),
    maximumOrder: Joi.number().label('Maximum Order'),
    maxDeliveryDays: Joi.number().label('Maximum Delivery Days'),
    ratingQty: Joi.number().label('Rating Quantity'),
    ratingAvg: Joi.number().label('Rating Average'),
    inStock: Joi.number().label('In Stock'),
    images: Joi.array().label('Images'),
    active: Joi.boolean().label('Active'),
  });

  return schema.validate(product);
};

const Product = model('Product', productSchema);

module.exports = {
  Product,
  validateProduct,
  validateProductUpdate,
};
