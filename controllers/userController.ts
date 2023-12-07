import { Request, Response } from 'express';
import User from '../models/userModel.js';
import { BadRequest, NotFound, Unauthorized } from '../error/errors.js';
import { compare, hash } from 'bcrypt';
import { passwordValidator } from '../util/validator.js';

export async function updateUser(
  req: Request,
  res: Response
): Promise<Response> {
  const { firstName, lastName, businessName } = req.body;
  const { user } = req;

  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (businessName) user.businessName = businessName;
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

export async function changePassword(
  req: Request,
  res: Response
): Promise<Response> {
  const { user } = req;
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword) {
    throw new BadRequest('Old password is required');
  }
  if (!newPassword) {
    throw new BadRequest('New password is required');
  }

  if (oldPassword === newPassword) {
    throw new BadRequest('Old password and new password cannot be the same');
  }

  if (!user) {
    throw new Unauthorized('User not found');
  }

  const isMatch: boolean = await compare(oldPassword, user.hashedPassword);

  if (!isMatch) {
    throw new Unauthorized('Old password is incorrect');
  }

  passwordValidator(newPassword);

  user.hashedPassword = await hash(newPassword, 10);
  await user.save();
  return res.status(200).json({
    message: 'Password changed successfully',
    user,
  });
}

export async function getUser(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;

  const user = await User.findByPk(id);

  if (!user) {
    throw new NotFound('User Not Found');
  }

  return res.json({
    status: 200,
    user,
  });
}
