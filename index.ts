import express from 'express';
import morgan from 'morgan';
import defaultRouter from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import cors from 'cors';
import { Express } from 'express';

const app: Express = express();

const logger = morgan('dev');
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(defaultRouter);
app.use('/api', defaultRouter);
app.use((req, res) => {
  res.status(404).json({ message: 'Not Found' });
});
app.use(errorHandler);
export default app;
