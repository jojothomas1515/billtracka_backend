import { Request, Response } from 'express';
import { PAYSTACK_SECRET_KEY } from '../config/config.js';
import axios from 'axios';
import crypto from 'crypto';

export async function pay(req: Request, res: Response): Promise<Response> {
  const { email, amount } = req.body;
  const payload = {
    email,
    amount: amount * 100,
  };

  const headers = {
    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
  };
  const url = 'https://api.paystack.co/transaction/initialize';
  const paystackResponse = await axios.post(url, payload, {
    headers,
  });
  if (paystackResponse.status !== 200) {
    return res.json({
      statusCode: paystackResponse.status,
      message: paystackResponse.data,
    });
  }

  const hash = crypto
    .createHmac('sha512', PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(req.body))
    .digest('hex');

  if (hash === req.headers['x-paystack-signature']) {
    // Retrieve the request's body
    //    const event = req.body;
    // Do something with event
    //
    //    if (event && event.event === 'charge.success') {
    //      const transaction = await Transaction.findByReferenceId(
    //        event.data.reference
    //      );
    //      if (!transaction) {
    //        return res.status(200).json({ message: 'Transfer completed 😁' });
    //      }
    //
    //      await Transaction.updateById(transaction.id, { status: 'COMPLETED' });
    //      const wallet = await Wallet.getUserWallet(transaction.userId);
    //      if (!wallet)
    //        return res.status(200).json({ message: 'Transfer completed 😁' });
    //      const balance = wallet?.balance + transaction.amount;
    //      await Wallet.updateById(wallet?.id, { balance });
    //      return res.status(200).json({ message: 'Transfer successful' });
    //    }
  }

  return res.json();
}
