import { Router, Request, Response } from 'express';
import authRouter from './authRouter.js';
import invoiceRouter from './invoiceRouter.js';
import userRouter from './userRouter.js';
import { isAuth } from '../middleware/isAuthenticated.js';
import swaggerUi from 'swagger-ui-express';

const defaultRouter: Router = Router();

defaultRouter.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup({
    openapi: '3.0.0',
    info: {
      title: 'Simple Todos API', // short title.
      description: 'A simple todos API', //  desc.
      version: '1.0.0', // version number
      contact: {
        name: 'John doe', // your name
        email: 'john@web.com', // your email
        url: 'web.com', // your website
      },
    },
    servers: [
      {
        url: 'http://localhost:5000', // url
        description: 'Local server', // name
      },
    ],
  })
);
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
