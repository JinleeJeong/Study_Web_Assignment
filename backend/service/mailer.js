const nodemailer = require('nodemailer');
const config = require('../config/keys');

const transport = nodemailer.createTransport({
  service: 'Mailgun',
  auth: {
    user: config.MAILGUN_USER,
    pass: config.MAILGUN_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

module.exports = {
  async sendEmail(from, to, subject, html){
    return new Promise(()=>{
      transport.sendMail({from, subject, to, html}, (err, info)=>{
        if (err) console.log(err);
        console.log(info);
      });
    });
  }
}