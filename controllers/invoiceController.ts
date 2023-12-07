import { Response, Request } from 'express';
import Invoice from '../models/invoiceModel.js';
import { BadRequest, NotFound } from '../error/errors.js';
import Item from '../models/itemModel.js';
import { Op } from 'sequelize';

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
    notes,
    paymentMode,
    total,
    discount,
    amountPaid,
    amountDue,
  } = req.body;
  const { user } = req;

  if (!clientName) {
    throw new BadRequest('Client name is required');
  }
  if (!amountDue) {
    throw new BadRequest('Amount due is required');
  }
  if (!total) {
    throw new BadRequest('Total is required');
  }

  const itemsArr = await Item.findAll({
    where: {
      userId: user.id,
      id: {
        [Op.in]: items ? items.map((item: { id: string }) => item.id) : [],
      },
    },
  });

  const invoice = (await Invoice.create(
    {
      clientName,
      clientEmail,
      clientPhone,
      clientAddress,
      clientState,
      clientCity,
      clientCountry,
      clientLga,
      status: status || 'pending',
      total,
      discount,
      amountPaid,
      amountDue,
      notes,
      paymentMode,
      ownerId: user.id,
    },
    {
      include: [
        {
          model: Item,
          as: 'items',
        },
      ],
    }
  )) as Invoice & { addItem(i: Item, through?: object): Promise<void> };
  for (const item of itemsArr) {
    await invoice.addItem(item, {
      through: {
        quantity: items.filter(
          (item_: { id: string; quantity: number }) => item.id === item_.id
        )[0].quantity,
      },
    });
  }

  await invoice.save();

  return res.status(201).json({
    status: 201,
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
    paymentMode,
    notes,
  } = req.body;

  if (paymentMode && !['CASH', 'CARD'].includes(paymentMode)) {
    throw new BadRequest('paymentMode must either CASH or CARD');
  }
  const invoice = (await Invoice.findOne({
    where: { ownerId: user.id, id },
  })) as Invoice & { setItem(i: Item, through?: object): Promise<void> };

  if (!invoice) {
    throw new NotFound('Invoice not found');
  }

  const itemsArr = await Item.findAll({
    where: {
      userId: user.id,
      id: {
        [Op.in]: items ? items.map((item: { id: string }) => item.id) : [],
      },
    },
  });

  invoice.clientName = clientName ?? invoice.clientName;
  invoice.clientEmail = clientEmail ?? invoice.clientEmail;
  invoice.clientPhone = clientPhone ?? invoice.clientPhone;
  invoice.clientAddress = clientAddress ?? invoice.clientAddress;
  invoice.clientState = clientState ?? invoice.clientState;
  invoice.clientCity = clientCity ?? invoice.clientCity;
  invoice.clientCountry = clientCountry ?? invoice.clientCountry;
  invoice.clientLga = clientLga ?? invoice.clientLga;
  invoice.status = status ?? invoice.status;
  invoice.total = total ?? invoice.total;
  invoice.discount = discount ?? invoice.discount;
  invoice.amountPaid = amountPaid ?? invoice.amountPaid;
  invoice.amountDue = amountDue ?? invoice.amountDue;
  invoice.notes = notes ?? invoice.notes;
  invoice.paymentMode = paymentMode ?? invoice.paymentMode;
  for (const item of itemsArr) {
    await invoice.setItem(item, {
      through: {
        quantity: items.filter(
          (item_: { id: string; quantity: number }) => item.id === item_.id
        )[0].quantity,
      },
    });
  }
  await invoice.save();

  //  const payload = {
  //    email: invoice.clientEmail,
  //    amount: Number(invoice.amountDue) * 100,
  //  };
  //
  //  const headers = {
  //    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
  //  };
  //  const url = 'https://api.paystack.co/transaction/initialize';
  //  const paystackResponse = await axios.post(url, payload, {
  //    headers,
  //  });
  //  if (paystackResponse.status === 200) {
  //    invoice.refId = paystackResponse.data.data.reference;
  //    invoice.paymentLink = paystackResponse.data.data.authorization_url;
  //    await invoice.save();
  //  }
  return res.status(201).json({
    //    message: paystackResponse.data.message,
    //    url: paystackResponse.data.data.authorization_url,
    status: 201,
    invoice,
  });
}

export async function getInvoicesByOwner(
  req: Request,
  res: Response
): Promise<Response> {
  const { user } = req;

  const invoices = await Invoice.findAll({
    where: { ownerId: user.id },
    include: [Item],
  });

  return res.json(invoices);
}

export async function getInvoiceById(
  req: Request,
  res: Response
): Promise<Response> {
  const { id } = req.params;

  const invoice = await Invoice.findByPk(id, { include: [Item] });

  if (!invoice) {
    throw new NotFound('Invoice Not Found');
  }

  return res.json({
    status: 200,
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
