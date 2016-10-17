// sends an SMS with the name of a friend and the friend's phone number to another number authorized to receive SMS's

var twilioSID = process.env.TWILIO_ACCOUNT_SID;
var twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;

var Promise = require('bluebird');
var sendMessage = Promise.promisify(require('twilio')(twilioSID, twilioAuthToken).sendMessage);

var FROM_PHONE_NUMBER = process.env.TWILIO_FROM_NUMBER;

/**
 * Sends an SMS message to the recipient with the body "name: phoneNumber"
 * @param recipient {String} phone number of the recipipient (e.g. '+16515556677')
 * @param name {String} name of the friend (e.g. Sagar Batchu)
 * @param phoneNumber {String} phone number of the friend (e.g. '+16515556677')
 * @returns {Response} reponse object from Twilio
 */
exports = module.exports = function(recipient, name, phoneNumber) {
  // make sure credentials are set
  if (!FROM_PHONE_NUMBER) {
    throw Error('must set TWILIO_FROM_NUMBER environment variable');
  }
  return sendMessage({
    to: recipient,
    from: FROM_PHONE_NUMBER,
    body: name + ": " + phoneNumber
  });
};

