const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host:     process.env.SMTP_HOST,
  port:     Number(process.env.SMTP_PORT),
  secure:   false, // usa STARTTLS se disponível
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

/**
 * Envia um e-mail
 * @param {{ to: string, subject: string, text?: string, html?: string }} opts
 */
async function sendEmail({ to, subject, text, html }) {
  const info = await transporter.sendMail({
    from:    process.env.EMAIL_FROM,
    to,
    subject,
    text,
    html
  });
  console.log('📧  Email enviado:', info.messageId);
  return info;
}

module.exports = { sendEmail };
