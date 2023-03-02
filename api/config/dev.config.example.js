module.exports = {
  APP_NAME: 'Organic Farms',
  BASE_URL: 'http://localhost:4000',
  DATABASE_URL: 'mongodb://localhost:27017/organic-farms',
  DATABASE_PASSWORD: 'password',

  JWT_COOKIE_EXPIRES_IN: '30',
  JWT_SECRET: 'secret',
  JWT_EXPIRES_IN: '30d',
  PASSWORD_RESET_TOKEN_EXPIRES_IN: '10',

  OTP_EXPIRES_IN: '2', // In minutes
  TWILIO_ACCOUNT_SID: 'sid',
  TWILIO_AUTH_TOKEN: 'token',
  TWILIO_PHONE_NUMBER: 'number',

  CLOUDINARY_NAME: 'name',
  CLOUDINARY_API_KEY: 'key',
  CLOUDINARY_API_SECRET_KEY: 'secret',
};
