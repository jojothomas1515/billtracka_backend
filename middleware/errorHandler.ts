import { Request, Response } from 'express';
import { CustomError } from '../error/errors.js';

export async function errorHandler(
  err: Error,
  req: Request,
  res: Response
): Promise<Response> {
  if (err instanceof CustomError) {
    return res
      .status(err.status)
      .json({ status: err.status, message: err.message });
  }
  return res.status(500).json({ message: 'Internal Server' });
}
