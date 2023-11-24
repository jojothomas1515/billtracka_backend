import { createTransport } from 'nodemailer';
import { nodemailerMjmlPlugin } from 'nodemailer-mjml';
import { join } from 'path';
import { configDotenv } from 'dotenv';
configDotenv();

const smtpConfig = {
  host: process.env.SMTPHOST ?? 'smtp.gmail.com',
  port: process.env.SMTPPORT ? parseInt(process.env.SMTPPORT) : 465,
  auth: {
    user: process.env.SMTPUSER ?? '',
    pass: process.env.SMTPPASS ?? '',
  },
};
const transport = createTransport({ ...smtpConfig });
transport.use(
  'compile',
  nodemailerMjmlPlugin({
    templateFolder: join(new URL('../', import.meta.url).pathname, 'templates'),
  })
);

export default transport;
