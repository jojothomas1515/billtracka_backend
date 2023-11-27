import { Request, Response } from 'express';
import User from '../models/userModel.js';
import { NotFound, Unauthorized } from '../error/errors.js';

export async function updateUser(
  req: Request,
  res: Response
): Promise<Response> {
  const { firstName, lastName, businessName } = req.body;
  const { user } = req;

  user.firstName = firstName;
  user.lastName = lastName;
  user.businessName = businessName;

  await user.save();
  return res.status(201).json({
    message: 'User updated successfully',
    user,
  });
}

export async function deleteUser(
  req: Request,
  res: Response
): Promise<Response> {
  const { user } = req;
  const { id } = req.params;

  if (id !== user.id) {
    throw new Unauthorized('Unauthorized to delete this user');
  }

  const uuser = await User.findOne({ where: { id } });

  if (!uuser) {
    throw new NotFound('User Not Found');
  }

  await uuser.destroy();

  return res.sendStatus(204);
}
