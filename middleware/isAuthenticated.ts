import { Response, Request, NextFunction } from 'express';
import { DecodedData } from '../types/types.js';
import jwt from 'jsonwebtoken';
import { JWTSECRET } from '../config/config.js';
import User from '../models/userModel.js';
import { Unauthorized } from '../error/errors.js';

export async function isAuth(
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new Unauthorized('Access Token Required');
  }

  const accessToken = authorization.split(' ')[1].trim();

  const decoded: DecodedData = jwt.verify(
    accessToken as string,
    JWTSECRET
  ) as DecodedData;

  const user = await User.findByPk(decoded.id);

  if (!user) {
    throw new Unauthorized('Access Token expired');
  }

  req.user = user;
  next();
}
