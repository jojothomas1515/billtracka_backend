import { Response, Request } from 'express';
import Invoice from '../models/invoiceModel.js';
import { BadRequest, NotFound } from '../error/errors.js';

export async function createInvoice(
  req: Request,
  res: Response
): Promise<Response> {
  console.log(req.body);
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

export async function updateInvoice(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;
  const { user } = req;
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

  const invoice = await Invoice.findOne({ where: { ownerId: user.id, id } });

  if (!invoice) {
    throw new NotFound('Invoice not found');
  }

  invoice.clientName = clientName;
  invoice.clientEmail = clientEmail;
  invoice.clientPhone = clientPhone;
  invoice.clientAddress = clientAddress;
  invoice.clientState = clientState;
  invoice.clientCity = clientCity;
  invoice.clientCountry = clientCountry;
  invoice.clientLga = clientLga;
  invoice.status = status;
  invoice.items = items;
  invoice.total = total;
  invoice.discount = discount;
  invoice.amountPaid = amountPaid;
  invoice.amountDue = amountDue;

  await invoice.save();

  return res.status(201).json({
    message: 'Invoice updated successfully',
    invoice,
  });
}

export async function getInvoicesByOwner(
  req: Request,
  res: Response
): Promise<Response> {
  const { user } = req;

  const invoices = await Invoice.findAll({ where: { ownerId: user.id } });

  return res.json(invoices);
}

export async function getInvoiceById(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;

  const invoice = await Invoice.findByPk(id);

  if (!invoice) {
    throw new NotFound('Invoice Not Found');
  }

  return res.json({
    invoice,
  });
}

export async function invoicePaidById(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;

  const { amountPaid } = req.body;

  const invoice = await Invoice.findByPk(id);

  if (!invoice) {
    throw new NotFound('Invoice not found');
  }

  if (!amountPaid) {
    throw new BadRequest('amountPaid is required');
  }
  invoice.amountPaid = amountPaid;
  invoice.amountDue = invoice.amountDue - amountPaid;
  await invoice.save();

  return res.status(201).json({
    message: 'Payment made successfully',
    invoice,
  });
}

export async function deleteInvoiceById(
  req: Request,
  res: Response
): Promise<Response> {
  const { user } = req;
  const { id } = req.params;

  const invoice = await Invoice.findOne({ where: { ownerId: user.id, id } });

  if (!invoice) {
    throw new NotFound('Invoice not found');
  }

  await invoice.destroy();

  return res.sendStatus(204);
}
