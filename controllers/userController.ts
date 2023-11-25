import { Request, Response } from 'express';

export async function updateUser(
  req: Request,
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
