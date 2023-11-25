import { Router, Request, Response } from 'express';
import authRouter from './authRouter.js';
import invoiceRouter from './invoiceRouter.js';
import userRouter from './userRouter.js';
import { isAuth } from '../middleware/isAuthenticated.js';

const defaultRouter: Router = Router();

defaultRouter.get('/status', (req: Request, res: Response) => {
  return res.json({ status: 'alive', message: 'it a wonderful day' });
});

defaultRouter.use('/auth', authRouter);
defaultRouter.use('/invoice', isAuth, invoiceRouter);
defaultRouter.use('/users', isAuth, userRouter);

export default defaultRouter;
