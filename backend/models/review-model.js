const Joi = require('joi');
const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const AppError = require('../utils/app-error');
const { Product } = require('./product-model');

const reviewSchema = new Schema(
  {
    review: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    branchOffice: {
      type: Schema.Types.ObjectId,
      ref: 'Branch',
    },
  },
  {
    timestamps: true,
  }
);

reviewSchema.statics.calcAverageRatings = async function (productId) {
  const stats = await this.aggregate([
    {
      $match: { product: productId },
    },
    {
      $group: {
        _id: '$product',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  if (stats.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      ratingQty: stats[0].nRating,
      ratingAvg: stats[0].avgRating,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      ratingQty: 0,
      ratingAvg: 0,
    });
  }
};

reviewSchema.pre(/^find/, function (next) {
  this.populate('product', 'name subcategory -farmer -branchOffice -createdBy -lastUpdatedBy');
  this.populate('user', 'name phone');
  this.populate('branchOffice', 'name address phone -createdBy -lastUpdatedBy');

  next();
});

reviewSchema.pre('save', async function (next) {
  const product = await this.model('Product').findById(this.product);
  if (!product) return next(new AppError('Product not found!', 404));

  this.branchOffice = product.branchOffice._id;

  next();
});

reviewSchema.post('save', function () {
  this.constructor.calcAverageRatings(this.product);
});

reviewSchema.post(/^findOneAnd/, async function (doc) {
  const productId = doc.product._id;
  if (productId) await doc.constructor.calcAverageRatings(productId);
});

const validateReview = (review) => {
  const schema = Joi.object({
    review: Joi.string().required().label('Review'),
    rating: Joi.number().min(1).max(5).required().label('Rating'),
    product: Joi.string().required().label('Product'),
  });

  return schema.validate(review);
};

const validateReviewUpdate = (review) => {
  const schema = Joi.object({
    review: Joi.string().label('Review'),
    rating: Joi.number().min(1).max(5).label('Rating'),
  });

  return schema.validate(review);
};

const Review = model('Review', reviewSchema);

module.exports = {
  Review,
  validateReview,
  validateReviewUpdate,
};
