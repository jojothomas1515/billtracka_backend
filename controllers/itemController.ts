import { Request, Response } from 'express';
import Item from '../models/itemModel.js';
import { BadRequest, NotFound } from '../error/errors.js';

export const createItem = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { user } = req;

  const { itemName, unitPrice, quantity, discount } = req.body;

  if (!itemName) {
    throw new BadRequest('Item name is required');
  }
  if (!unitPrice) {
    throw new BadRequest('Unit price is required');
  }
  if (!quantity) {
    throw new BadRequest('Quantity is required');
  }
  if (!discount && discount === undefined) {
    throw new BadRequest('Discount is required');
  }
  const item = await Item.create({
    itemName,
    unitPrice,
    quantity,
    discount,
    userId: user.id,
  });

  return res.status(201).json({
    status: 201,
    data: item,
  });
};

export const getItems = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { user } = req;

  const items = await Item.findAll({
    where: {
      userId: user.id,
    },
  });

  return res.status(200).json({
    status: 200,
    data: items,
  });
};

export const getItem = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { user } = req;

  const { itemId } = req.params;

  const item = await Item.findOne({
    where: {
      id: itemId,
      userId: user.id,
    },
  });

  if (!item) {
    throw new NotFound('Item not found');
  }

  return res.status(200).json({
    status: 200,
    data: item,
  });
};

export const updateItem = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { user } = req;

  const { itemId } = req.params;

  const { itemName, unitPrice, quantity, discount } = req.body;

  if (!itemName) {
    throw new BadRequest('Item name is required');
  }
  if (!unitPrice) {
    throw new BadRequest('Unit price is required');
  }
  if (!quantity) {
    throw new BadRequest('Quantity is required');
  }
  if (!discount && discount === undefined) {
    throw new BadRequest('Discount is required');
  }

  const item: Item | null = await Item.findOne({
    where: {
      id: itemId,
      userId: user.id,
    },
  });

  if (!item) {
    throw new NotFound('Item not found');
  }

  item.itemName = itemName;
  item.unitPrice = unitPrice;
  item.quantity = quantity;
  item.discount = discount;

  await item.save();

  return res.status(201).json({
    status: 201,
    data: item,
  });
};

export const deleteItem = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { user } = req;

  const { itemId } = req.params;

  const item = await Item.findOne({
    where: {
      id: itemId,
      userId: user.id,
    },
  });

  if (!item) {
    throw new NotFound('Item not found');
  }

  await item.destroy();

  return res.status(200).json({
    status: 200,
    message: 'Item deleted successfully',
  });
};
