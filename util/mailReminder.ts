import cron from 'node-cron';
import Invoice from '../models/invoiceModel.js';
import { sendReminderMail } from './mailer.js';

async function sendAllReminder() {
  const unpaidInvoices = await Invoice.findAll({
    where: {
      status: 'UNPAID',
    },
  });

  for (const invoice of unpaidInvoices) {
    // send mail to client
    const paymentLink = invoice.paymentLink;
    const clientEmail = invoice.clientEmail;
    const clientName = invoice.clientName;
    await sendReminderMail(clientEmail, paymentLink, clientName);
  }
}

export default cron.schedule('*, *, */12, *,*, *', sendAllReminder);
