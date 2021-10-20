const Mailer = require('./mailer');

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
