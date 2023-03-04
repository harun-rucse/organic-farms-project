const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');

module.exports = (app) => {
  // 1) GLOBAL MIDDLEWARE
  app.enable('trust proxy');

  // Enable CORS request
  app.use(cors());

  // Set security HTTP headers
  app.use(helmet());

  //Development Logging
  if (process.env.NODE_ENV === 'development') {
    app.use(require('morgan')('dev'));
  }

  // Limit request with same API
  const limiter = rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 1000, //Its allowed 1000 request from same IP with 1 hour
    message: 'To many requests with this IP, Please try in an hour!',
  });
  app.use('/api', limiter);

  // Body parser, reading data from body
  app.use(express.json({ limit: '10kb' }));
  app.use(express.urlencoded({ extended: true, limit: '10kb' }));

  // Serve cookie in request object
  app.use(cookieParser());

  // Data sanitization against NOSQL query injection
  app.use(mongoSanitize());

  // Data sanitization against XSS
  app.use(xss());

  // Prevent parameter polution
  app.use(hpp());

  // Compression
  app.use(compression());
};
