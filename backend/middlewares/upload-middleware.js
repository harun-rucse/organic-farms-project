const multer = require('multer');
const sharp = require('sharp');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const catchAsync = require('../utils/catch-async');
const AppError = require('../utils/app-error');

// Configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
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
const uploadImages = upload.array('images', 5);

const saveImageUrl = (folderName) => {
  return catchAsync(async (req, res, next) => {
    if (!req.file) return next();

    // Resize image
    req.file.buffer = await sharp(req.file.buffer).resize(500, 500).toFormat('jpeg').jpeg({ quality: 90 }).toBuffer();

    const result = await uploadCloud(req.file.buffer, folderName);
    req.body[req.file.fieldname] = result.url;

    next();
  });
};

const saveImagesUrl = (folderName) => {
  return catchAsync(async (req, res, next) => {
    if (!req.files) return next();

    // Resize images and upload to cloud
    const images = await Promise.all(
      req.files.map(async (file) => {
        file.buffer = await sharp(file.buffer).resize(500, 500).toFormat('jpeg').jpeg({ quality: 90 }).toBuffer();

        const result = await uploadCloud(file.buffer, folderName);
        return result.url;
      })
    );

    req.body[req.files[0].fieldname] = images;

    next();
  });
};

module.exports = {
  uploadImage,
  saveImageUrl,
  uploadImages,
  saveImagesUrl,
};
