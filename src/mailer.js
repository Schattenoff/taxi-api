const mailer = require('nodemailer');

const config = require('./config/mailer');

class Mailer {
  init() {
    this._transporter = mailer.createTransport({
      service: config.mailService,
      auth: {
        user: config.user,
        pass: config.password
      }
    });
  }

  sendMessage(message, receiver, options) {
    return new Promise((resolve, reject) => {
      this._transporter.sendMail({
        from: config.user,
        to: receiver,
        subject: config.mailSubject,
        html: message,
        ...options
      }, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      })
    })
  }
}

module.exports = new Mailer();
