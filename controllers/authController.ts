import { Request, Response } from 'express';
import { BadRequest, NotFound, Unauthorized } from '../error/errors.js';
import { passwordValidator } from '../util/validator.js';
import jwt from 'jsonwebtoken';
import { compare, hash } from 'bcrypt';
import User from '../models/userModel.js';
import { sendPasswordResetMail, sendWelcomeMail } from '../util/mailer.js';
import { RESETPASSWORD_URL, VERIFICATION_URL } from '../config/config.js';

export async function signUpWithEmail(
  req: Request,
  res: Response
): Promise<Response> {
  const { email, password, firstName, lastName } = req.body;

  if (!email) {
    throw new Unauthorized('Email or required to signup');
  }
  passwordValidator(password);

  const checkUser: User | null = await User.findOne({ where: { email } });
  if (checkUser) {
    throw new Unauthorized('Email already exists');
  }

  const hashedPassword = await hash(password, 10);

  const user: User = await User.create({
    firstName,
    lastName,
    email,
    hashedPassword,
  });

  if (!user) {
    throw new Unauthorized('User not created');
  }
  const code: string = Math.floor(Math.random() * 9999).toString();
  user.verificationToken = code;
  await user.save();
  const mailStatus = await sendWelcomeMail(
    user.email,
    `${VERIFICATION_URL}?code=${code}&id=${user.id}`,
    code
  );
  if (!mailStatus.response.includes('OK')) {
    await user.destroy();
    throw new Unauthorized('User not created');
  }
  return res.status(201).json({
    message: 'User created successfully',
    user,
  });
}
export async function signUpWithPhone(
  req: Request,
  res: Response
): Promise<Response> {
  const { phone, password, firstName, lastName } = req.body;

  if (!phone) {
    throw new Unauthorized('Email or required to signup');
  }
  passwordValidator(password);

  const checkUser: User | null = await User.findOne({ where: { phone } });
  if (checkUser) {
    throw new Unauthorized('Email already exists');
  }

  const hashedPassword = await hash(password, 10);

  const user: User = await User.create({
    firstName,
    lastName,
    phone,
    hashedPassword,
  });

  if (!user) {
    throw new Unauthorized('User not created');
  }
  const code: string = Math.floor(Math.random() * 9999).toString();
  user.verificationToken = code;
  await user.save();
  const mailStatus = await sendWelcomeMail(
    user.phone,
    `${VERIFICATION_URL}?code=${code}&id=${user.id}`,
    code
  );
  if (!mailStatus.response.includes('OK')) {
    await user.destroy();
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
    throw new NotFound('User not found');
  }

  if (!user.isVerified) {
    throw new Unauthorized('The users is not verified');
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

export async function verifyUser(
  req: Request,
  res: Response
): Promise<Response> {
  const { code, id } = req.query;
  if (!code) {
    throw new BadRequest('verification code required');
  }
  if (!id) {
    throw new BadRequest('user id required');
  }

  const user: User | null = await User.findByPk(id as string);
  if (!user) {
    throw new NotFound('User not found');
  }

  if (code !== user.verificationToken) {
    throw new Unauthorized('invalid verification code');
  }
  user.isVerified = true;
  user.verificationToken = null;
  await user.save();
  return res.status(200).json({
    status: 200,
    message: 'user verified successfully',
  });
}

export async function refreshToken(
  req: Request,
  res: Response
): Promise<Response> {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    throw new BadRequest('Refresh token not found');
  }
  const decoded: jwt.JwtPayload & { id: string } = jwt.verify(
    refreshToken,
    process.env.JWTREFRESHSECRET!
  ) as jwt.JwtPayload & { id: string };
  const user: User | null = await User.findByPk(decoded.id);
  if (!user) {
    throw new NotFound('User not found');
  }

  if (refreshToken !== user.refreshToken) {
    throw new BadRequest('Invalid refresh token');
  }

  const token: string = jwt.sign({ id: user.id }, process.env.JWTSECRET!, {
    expiresIn: '2h',
  });
  user.refreshToken = jwt.sign({ id: user.id }, process.env.JWTREFRESHSECRET!, {
    expiresIn: '7d',
  });
  await user.save();
  return res.status(200).json({
    message: 'Token refreshed successfully',
    token,
    refreshToken: user.refreshToken,
  });
}

export async function forgotPassword(
  req: Request,
  res: Response
): Promise<Response> {
  const { email } = req.body;
  if (!email) {
    throw new BadRequest('Email required');
  }
  const user: User | null = await User.findOne({ where: { email } });
  if (!user) {
    throw new NotFound('User not found');
  }
  const code: string = Math.floor(Math.random() * 9999).toString();
  user.verificationToken = code;
  const mailStatus = await sendPasswordResetMail(
    user.email,
    `${RESETPASSWORD_URL}?code=${code}&email=${user.email}`,
    code
  );
  if (!mailStatus.response.includes('OK')) {
    throw new Error('Mail not sent');
  }
  await user.save();

  return res.status(200).json({
    status: 200,
    message: 'Password reset mail sent successfully',
  });
}

export async function resetPassword(
  req: Request,
  res: Response
): Promise<Response> {
  const { code, password, email } = req.body;
  if (!code) {
    throw new BadRequest('Password reset code is required');
  }
  if (!password) {
    throw new BadRequest('Password is required');
  }

  if (!email) {
    throw new BadRequest('Email is required');
  }
  const user: User | null = await User.findOne({ where: { email } });
  if (!user) {
    throw new NotFound('User not found');
  }

  if (code !== user.verificationToken) {
    throw new Unauthorized('Code is incorrect or not longer valid');
  }
  passwordValidator(password);
  user.hashedPassword = await hash(password, 10);
  user.verificationToken = null;
  await user.save();
  return res.status(201).json({
    status: 201,
    message: 'Password reset successfully',
  });
}
