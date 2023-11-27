import { Request, Response } from 'express';
import { PAYSTACK_SECRET_KEY } from '../config/config.js';
import axios from 'axios';
import Invoice from '../models/invoiceModel.js';
import { NotFound } from '../error/errors.js';
import crypto from 'crypto';

export async function pay(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;

  const invoice = await Invoice.findByPk(id);

  if (!invoice) {
    throw new NotFound('Invoice not found');
  }
  const payload = {
    email: invoice.clientEmail,
    amount: Number(invoice.amountDue) * 100,
  };

  const headers = {
    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
  };
  const url = 'https://api.paystack.co/transaction/initialize';
  const paystackResponse = await axios.post(url, payload, {
    headers,
  });
  if (paystackResponse.status === 200) {
    invoice.refId = paystackResponse.data.data.reference;
    await invoice.save();
    return res.json({
      statusCode: paystackResponse.status,
      message: paystackResponse.data.message,
      url: paystackResponse.data.data.authorization_url,
    });
  }
  return res.json({
    statusCode: paystackResponse.status,
  });
}

export async function verifyPayment(
  req: Request,
  res: Response
): Promise<Response> {
  const hash = crypto
    .createHmac('sha512', PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(req.body))
    .digest('hex');
  console.log(hash);
  console.log('\n\n\n\n');
  console.log(req.headers);
  console.log('\n\n\n\n');
  console.log(req.body);
  if (hash === req.headers['x-paystack-signature']) {
    //     Retrieve the request's body
    const event = req.body;
    //     Do something with event

    if (event && event.event === 'charge.success') {
      const invoice = await Invoice.findOne({
        where: { refId: event.data.reference },
      });
      if (!invoice) {
        return res.status(200).json({ message: 'Transfer completed 😁' });
      }

      invoice.amountDue = 0;
      invoice.amountPaid = invoice.total;
      invoice.status = 'paid';
      await invoice.save();
    }

    return res.json();
  }
  return res.status(400).json({ message: 'Invalid signature' });
}
