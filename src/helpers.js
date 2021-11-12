const Mailer = require('./mailer');
const formidable = require('formidable');

const UnprocessableEntityError = require('./errors/validation');
const constants = require('./constants');

exports.sendResetPasswordLink = (email, link, firstName, lastName) => {
  return Mailer.sendMessage(`<h1>Hi ${firstName} ${lastName}!</h1>
  <h2>It looks like you forgot your password</h2>
  <p>Don't worry! We can restore it easily. Just click the button below.</p>
  <a href="${link}" style="width: fit-content;display: block;text-decoration: none;margin-top: 10px;padding: 20px 30px;background-color: #333;color: white;border: none; border-radius: 7px;font-size: 30px;">Restore Password</a>`, email, {subject: 'Reset Password General Soft Taxi'});
}

exports.sendEmailVerificationLink = (email, link, firstName, lastName) => {
  return Mailer.sendMessage(`<h1>Hi ${firstName} ${lastName}!</h1>
  <h2>Welcome to the General Soft Taxi service!</h2>
  <p>To use our service you should pass email verification.</p>
  <p>To do it, just click the button below</p>
  <a href="${link}" style="width: fit-content;display: block;text-decoration: none;margin-top: 10px;padding: 20px 30px;background-color: #333;color: white;border: none; border-radius: 7px;font-size: 30px;">Verify Email Address</a>`, email);
};

exports.readFormData = (request) => new Promise((resolve, reject) => {
  new formidable.IncomingForm().parse(request, async (error, fields, files) => {
    const file = files['file'];

    if (!error) {
      if (!file) {
        reject(new UnprocessableEntityError('Photo of the car is required!'));
      } else
      if (file.size > 5000000) {
        reject(new UnprocessableEntityError('Maximum file size is 5Mb!'));
      }
      if (!checkAttributeOnExtension(file.mimetype) && !checkAttributeOnExtension(file.originalFilename)) {
        reject(new UnprocessableEntityError('Photo must have one of the following formats: .jpg, .jpeg'));
      } else {
        resolve(file);
      }
    } else {
      reject(error);
    }     
  });
})

const checkAttributeOnExtension = (attribute) => {
  return constants.acceptedPhotoFormats.some(format => attribute.includes(format));
};
