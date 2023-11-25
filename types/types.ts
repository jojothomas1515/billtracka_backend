import { Response, Request } from 'express';
import { IncomingHttpHeaders } from 'http';
import { JwtPayload } from 'jsonwebtoken';
import User from '../models/userModel.js';

export type RTResponse = Promise<Response | undefined>;
export interface TRequest extends Request {
  user: null | User;

  headers: IncomingHttpHeaders & { token: string };
}
export interface DecodedData extends JwtPayload {
  id: string;
}
