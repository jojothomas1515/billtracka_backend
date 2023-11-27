import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../error/errors.js';
import jwt from 'jsonwebtoken';

const TokenExpiredError = jwt.TokenExpiredError;
const JsonWebTokenError = jwt.JsonWebTokenError;
export async function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): Promise<Response> {
  if (err instanceof CustomError) {
    return res
      .status(err.status)
      .json({ status: err.status, message: err.message });
  }
  if (err instanceof TokenExpiredError || err instanceof JsonWebTokenError)
    return res.status(400).json({ message: err.message });
  console.error(err);
  return res.status(500).json({ message: 'Internal Server' });
}
