import { Router, Request, Response } from 'express';
import authRouter from './authRouter.js';
import invoiceRouter from './invoiceRouter.js';
import userRouter from './userRouter.js';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import yaml from 'yaml';
import itemRouter from './itemRouter.js';
import taskRouter from './taskRouter.js';
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
defaultRouter.use('/invoice', invoiceRouter);
defaultRouter.use('/users', userRouter);
defaultRouter.use('items', itemRouter);
defaultRouter.use('/tasks', taskRouter);

export default defaultRouter;
