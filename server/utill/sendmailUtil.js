const nodemailer = require('nodemailer');

/**
 * Send mail
 * @param {to} to - example 'exampl@gmail.com,example2@gmail.com'
 * @param {subject} subject
 * @param {html} html
 */
async function sendMail(to, subject, html) {
  if (to === undefined) return false;

  // create reusable transporter object using the default SMTP transport
  // values in the server/.env

  if (process.env.TRANSPORTER_EMAIL !== undefined) {
    if (process.env.TRANSPORTER_EMAIL === 'email-smtp.eu-west-2.amazonaws.com') {
      transporter = nodemailer.createTransport({
        host: process.env.TRANSPORTER_EMAIL,
        port: process.env.TRANSPORTER_PORT,  
        requireTLS: true,
        auth: {
          user: process.env.TRANSPORTER_USER, 
          pass: process.env.TRANSPORTER_PASSWORD, 
        },
        secure: false // true for 465, false for other ports
      });
    } else if (process.env.TRANSPORTER_EMAIL === '172.32.0.12' || process.env.TRANSPORTER_EMAIL === '127.0.0.1') {
      transporter = nodemailer.createTransport({
        host: process.env.TRANSPORTER_EMAIL, // testmail local : testAccount.smtp.host // values in the server/.env
        port: process.env.TRANSPORTER_PORT, // testmail local : testAccount.smtp.port
        secure: false // true for 465, false for other ports
      });
    } else {
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      const testAccount = await nodemailer.createTestAccount();

      transporter = nodemailer.createTransport({
        host: process.env.TRANSPORTER_EMAIL, // testmail local : testAccount.smtp.host // values in the server/.env
        port: process.env.TRANSPORTER_PORT, // testmail local : testAccount.smtp.port
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        }
      });
    }
  } else {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    const testAccount = await nodemailer.createTestAccount();

    transporter = nodemailer.createTransport({
      host: testAccount.smtp.host, //process.env.TRANSPORTER_EMAIL, // testmail local : testAccount.smtp.host // values in the server/.env
      port: testAccount.smtp.port, //process.env.TRANSPORTER_PORT, // testmail local : testAccount.smtp.port
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      }
    });
  }

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"insightia" <Webmaster@insightia.com>', // sender address
    to, // list of receivers
    subject, // Subject line
    text: '', // plain text body
    html, // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

sendMail().catch(console.error);

function getHostEnviroment(host) {
  if (host !== undefined) {
    if (host.includes('one.insightia.com')) {
      return 'Live';
    }
    if (host.includes('stageapp.insightia.com')) {
      return 'Stage';
    }
    if (host.includes('localhost')) {
      return 'Local';
    }
  }
  return 'Unknown';
}

module.exports = {
  sendMail,
  getHostEnviroment,
};
