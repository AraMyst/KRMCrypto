// utils/email.util.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp-relay.sendinblue.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // TLS será usado se disponível
  auth: {
    user: process.env.SMTP_USER || 'myfromemail@mycompany.com',
    pass: process.env.SMTP_PASS || 'G8c7OUptbnACJWvF'
  }
});

/**
 * Envia um e-mail.
 * @param {Object} opts
 * @param {string} opts.to Destinatário
 * @param {string} opts.subject Assunto
 * @param {string} [opts.text] Texto puro
 * @param {string} [opts.html] Conteúdo HTML
 */
async function sendEmail({ to, subject, text, html }) {
  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM || '"KRMCrypto" <no-reply@krmcrypto.com>',
    to,
    subject,
    text,
    html
  });
  console.log('Email sent:', info.messageId);
  return info;
}

module.exports = {
  sendEmail
};
