const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');
module.exports = class Email {
  constructor(email) {
    this.to = email;
    this.firstName = email;
    this.from = `Minh Thuan Schmedtmann <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
  async send(template, subject) {
    const QueryType = 'auto:ip';
    const responseCurrent = await fetch(
      `http://api.weatherapi.com/v1/current.json?q=${QueryType}&key=${process.env.API_KEY}`
    );
    const current = await responseCurrent.json();
    const data = {};
    data.current = current;
    data.subject = subject;
    // 1) Render html based on a pug template
    const html = pug.renderFile(
      `${__dirname}/../views/email/${template}.pug`,
      data
    );
    // 2) define the mail options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.convert(html, {
        wordwrap: 130,
      }), // chuyển đổi từ html sang text
    };
    // 3) create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }
  async sendWelcome() {
    await this.send('welcome', 'Daily weather information !');
  }
};
