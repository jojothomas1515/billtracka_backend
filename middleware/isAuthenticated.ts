import { Response, NextFunction } from 'express';
import { DecodedData, TRequest } from '../types/types.js';
import { verify } from 'jsonwebtoken';
import { JWTSECRET } from '../config/config.js';
import User from '../models/userModel.js';
import { Unauthorized } from '../error/errors.js';

export async function isAuth(
  req: TRequest,
  _res: Response,
  next: NextFunction
): Promise<void> {
  const { accessToken } = req.headers;

  const decoded: DecodedData = verify(
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
