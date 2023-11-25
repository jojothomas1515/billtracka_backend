import { Response } from 'express';
import { TRequest } from '../types/types.js';

export async function updateUser(
  req: TRequest,
  res: Response
): Promise<Response> {
  const { firstName, lastName } = req.body;
  const { user } = req;

  user.firstName = firstName;
  user.lastName = lastName;

  await user.save();
  return res.status(200).json({
    message: 'User updated successfully',
    user,
  });
}
