import { JwtPayload } from 'jsonwebtoken';
import User from '../models/userModel.js';

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

export interface DecodedData extends JwtPayload {
  id: string;
}
