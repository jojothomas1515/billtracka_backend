import { Request, Response } from 'express';
import { Unauthorized } from '../error/errors.js';
import { passwordValidator } from '../util/validator.js';
import { hash } from 'bcrypt';
import User from '../models/userModel.js';

export async function signUp(req: Request, res: Response): Promise<Response> {
  const { email, phone, password, firstName, lastName } = req.body;

  if (!email && !phone) {
    throw new Unauthorized('Email or Phone Number is required to signup');
  }
  passwordValidator(password);

  if (email) {
    const user: User | null = await User.findOne({ where: { email } });
    if (user) {
      throw new Unauthorized('Email already exists');
    }
  }

  if (phone) {
    const user: User | null = await User.findOne({ where: { phone } });
    if (user) {
      throw new Unauthorized('Phone Number already exists');
    }
  }

  const hashedPassword = await hash(password, 10);

  const user: User = await User.create({
    firstName,
    lastName,
    email,
    phone,
    hashedPassword,
  });

  if (!user) {
    throw new Unauthorized('User not created');
  }

  return res.status(201).json({
    message: 'User created successfully',
  });
}
