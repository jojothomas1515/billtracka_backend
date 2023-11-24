import transport from '../config/mailConfig.js';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export async function sendWelcomeMail(
  to: string,
  verifyUrl: string
): Promise<SMTPTransport.SentMessageInfo> {
  return transport.sendMail({
    from: process.env.SMTPUSER ?? '',
    to,
    subject: 'Welcome to the BillTracka Family',
    templateName: 'welcome',
    templateData: {
      verifyUrl: verifyUrl,
    },
  });
}
