import { createTransport } from 'nodemailer';
import { nodemailerMjmlPlugin } from 'nodemailer-mjml';

const transport = createTransport({
  host: 'smtp.google.com',
  port: 587,
});
