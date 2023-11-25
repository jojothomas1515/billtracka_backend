import { Response } from 'express';
import { IncomingHttpHeaders } from 'http';
import { JwtPayload } from 'jsonwebtoken';
import User from '../models/userModel.js';

export type RTResponse = Promise<Response | undefined>;

declare global {
  namespace Express {
    interface Request {
      user: User;
      headers: IncomingHttpHeaders & { token: string };
    }
  }
}

export interface DecodedData extends JwtPayload {
  id: string;
}
