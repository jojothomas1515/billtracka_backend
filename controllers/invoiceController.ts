import { Response } from 'express';
import { TRequest } from '../types/types.js';
import Invoice from '../models/invoiceModel.js';
import { BadRequest } from '../error/errors.js';

export async function createInvoice(
  req: TRequest,
  res: Response
): Promise<Response> {
  const {
    clientName,
    clientEmail,
    clientPhone,
    clientAddress,
    clientState,
    clientCity,
    clientCountry,
    clientLga,
    status,
    items,
    total,
    discount,
    amountPaid,
    amountDue,
  } = req.body;
  const { user } = req;

  if (!clientName) {
    throw new BadRequest('Client name is required');
  }

  const invoice = await Invoice.create({
    clientName,
    clientEmail,
    clientPhone,
    clientAddress,
    clientState,
    clientCity,
    clientCountry,
    clientLga,
    status,
    items,
    total,
    discount,
    amountPaid,
    amountDue,
    ownerId: user.id,
  });

  return res.status(201).json({
    status: 'success',
    invoice,
  });
}
