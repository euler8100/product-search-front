const { sendMail } = require('./use-cases/sendMail.js');

class Controller {
  static sendMail(firstName, lastName, reason, email, message) {
    return sendMail(firstName, lastName, reason, email, message);
  }
}

exports.Controller = Controller;
