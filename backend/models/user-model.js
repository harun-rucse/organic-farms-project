const Joi = require('joi');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema, model } = mongoose;
require('./employee-model');

const roles_enum = ['admin', 'branch-manager', 'office-employee', 'warehouse-employee', 'delivery-person', 'customer'];

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      unique: true,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    image: {
      type: String,
      default: 'https://res.cloudinary.com/harun-rucse/image/upload/v1679509330/users/default.png',
    },
    role: {
      type: String,
      enum: roles_enum,
      default: 'customer',
    },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpired: Date,
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

userSchema.virtual('employee', {
  ref: 'Employee',
  foreignField: 'user',
  localField: '_id',
});

// Pre save hook that hash the password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Pre save hook that add passwordChangeAt when password is changed
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangeAt = Date.now() - 1000;

  next();
});

// Pre find hook that populate employee branch office
userSchema.pre('findOne', function (next) {
  this.populate('employee', 'branchOffice -user');

  next();
});

// Return true if password is correct, otherwise return false
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Return true if password is changed after JWT issued
userSchema.methods.passwordChangeAfter = function (JWTTimestamp) {
  if (this.passwordChangeAt) {
    const passwordChangeTimestamp = parseInt(this.passwordChangeAt.getTime() / 1000, 10);
    return passwordChangeTimestamp > JWTTimestamp;
  }
  return false;
};

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().required().label('Name'),
    phone: Joi.string()
      .pattern(/^\+8801[3-9]{1}[0-9]{8}$/)
      .messages({ 'string.pattern.base': `Phone number is not valid.` })
      .required(),
    address: Joi.string().required().label('Address'),
    password: Joi.string().min(4).max(20).required().label('Password'),
    image: Joi.string().label('Image'),
    role: Joi.string()
      .valid('admin', 'branch-manager', 'office-employee', 'warehouse-employee', 'delivery-person', 'customer')
      .label('Role'),
    verified: Joi.boolean().label('Verified'),
  });

  return schema.validate(user);
};

const validateUserUpdate = (user) => {
  const schema = Joi.object({
    name: Joi.string().label('Name'),
    phone: Joi.string()
      .pattern(/^\+8801[3-9]{1}[0-9]{8}$/)
      .messages({ 'string.pattern.base': `Phone number is not valid.` }),
    address: Joi.string().label('Address'),
    image: Joi.string().label('Image'),
    role: Joi.string()
      .valid('admin', 'branch-manager', 'office-employee', 'warehouse-employee', 'delivery-person', 'customer')
      .label('Role'),
    verified: Joi.boolean().label('Verified'),
  });

  return schema.validate(user);
};

const validateUserPassword = (user) => {
  const schema = Joi.object({
    password: Joi.string().min(4).max(20).required().label('Password'),
  });

  return schema.validate(user);
};

const validateUpdatePassword = (user) => {
  const schema = Joi.object({
    passwordCurrent: Joi.string().required().label('Current Password'),
    password: Joi.string().min(4).max(20).required().label('Password'),
    passwordConfirm: Joi.any()
      .equal(Joi.ref('password'))
      .required()
      .label('Confirm password')
      .messages({ 'any.only': '{{#label}} does not match' }),
  });

  return schema.validate(user);
};

const User = model('User', userSchema);

module.exports = {
  User,
  validateUser,
  validateUserUpdate,
  validateUserPassword,
  validateUpdatePassword,
};
