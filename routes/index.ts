import { Router, Request, Response } from 'express';
import authRouter from './authRouter.js';
import invoiceRouter from './invoiceRouter.js';
import userRouter from './userRouter.js';
import { isAuth } from '../middleware/isAuthenticated.js';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import yaml from 'yaml';
const defaultRouter: Router = Router();

const file = fs.readFileSync('./docs/apidoc.yaml', 'utf-8');
const swaggerDocument = yaml.parse(file);

defaultRouter.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
defaultRouter.get('/status', (req: Request, res: Response) => {
  return res.json({
    status: 'alive',
    message: 'it a wonderful day, is it not?',
  });
});

defaultRouter.use('/auth', authRouter);
defaultRouter.use('/invoice', isAuth, invoiceRouter);
defaultRouter.use('/users', isAuth, userRouter);

export default defaultRouter;
