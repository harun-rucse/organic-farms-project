const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');
const config = require('../config');

// Configure cloudinary
cloudinary.config({
  cloud_name: config.CLOUDINARY_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET_KEY,
});

// Upload image to the cloudinary cloud
const uploadCloud = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const cloudinaryUploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(cloudinaryUploadStream);
  });
};

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload an image.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadImage = upload.single('image');

const saveImageUrl = (folderName) => {
  return catchAsync(async (req, res, next) => {
    if (!req.file) return next();

    const result = await uploadCloud(req.file.buffer, folderName);
    req.body[req.file.fieldname] = result.url;

    next();
  });
};

module.exports = {
  uploadImage,
  saveImageUrl,
};
