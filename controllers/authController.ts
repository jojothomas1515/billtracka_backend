import { Request, Response } from 'express';
import { Unauthorized } from '../error/errors.js';
import { passwordValidator } from '../util/validator.js';
import jwt from 'jsonwebtoken';
import { compare, hash } from 'bcrypt';
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
    user,
  });
}

export async function signIn(req: Request, res: Response): Promise<Response> {
  const { email, phone, password } = req.body;

  if (!email && !phone) {
    throw new Unauthorized('Email or Phone Number is required to signin');
  }

  let user: User | null = null;
  if (email) {
    user = await User.findOne({
      where: { email },
    });
  } else if (phone) {
    user = await User.findOne({
      where: { phone },
    });
  }

  if (!user) {
    throw new Unauthorized('User not found');
  }

  const isMatch: boolean = await compare(password, user.hashedPassword);

  if (!isMatch) {
    throw new Unauthorized('Invalid credentials');
  }

  const token: string = jwt.sign({ id: user.id }, process.env.JWTSECRET!, {
    expiresIn: '2h',
  });
  user.refreshToken = jwt.sign({ id: user.id }, process.env.JWTREFRESHSECRET!, {
    expiresIn: '7d',
  });
  await user.save();

  return res.status(200).json({
    message: 'User signed in successfully',
    user,
    token,
    refreshToken: user.refreshToken,
  });
}
