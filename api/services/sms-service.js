const config = require('../config');
const client = require('twilio')(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);

const sendSMS = (phone, message) => {
  return client.messages.create({
    body: message,
    from: config.TWILIO_PHONE_NUMBER,
    to: phone,
  });
};

module.exports = { sendSMS };
