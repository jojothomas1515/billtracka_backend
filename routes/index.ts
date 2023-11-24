import { Router, Request, Response } from 'express';
import authRouter from './authRouter.js';

const defaultRouter: Router = Router();

defaultRouter.get('/status', (req: Request, res: Response) => {
  return res.json({ status: 'alive', message: 'it a wonderful day' });
});

defaultRouter.use('/auth', authRouter);

export default defaultRouter;
