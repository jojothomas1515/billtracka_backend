import transport from '../config/mailConfig.js';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export async function sendWelcomeMail(
  to: string,
  verifyUrl: string,
  code: string
): Promise<SMTPTransport.SentMessageInfo> {
  return transport.sendMail({
    from: process.env.SMTPUSER ?? '',
    to,
    subject: 'Welcome to the BillTracka Family',
    templateName: 'welcome',
    templateData: {
      verifyUrl: verifyUrl,
      code: code,
    },
  });
}

export async function sendPasswordResetMail(
  to: string,
  resetUrl: string,
  code: string
): Promise<SMTPTransport.SentMessageInfo> {
  return transport.sendMail({
    from: process.env.SMTPUSER ?? '',
    to,
    subject: 'Password Reset',
    templateName: 'passwordReset',
    templateData: {
      resetUrl: resetUrl,
      code: code,
    },
  });
}
