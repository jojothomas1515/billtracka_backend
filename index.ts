import express, { Express } from 'express';
import morgan from 'morgan';
import defaultRouter from './routes';
// import fs from 'fs';
import authRouter from './routes/authRouter';
import { errorHandler } from './middleware/errorHandler';

const app: Express = express();

// const accessLog = fs.createWriteStream('/tmp/access.log', {
//     flags: 'a',
// });

const logger = morgan('dev');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(defaultRouter);
app.use('/auth', authRouter);

app.use(errorHandler);
export default app;
