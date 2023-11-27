import { Sequelize } from 'sequelize-typescript';
import { configDotenv } from 'dotenv';
configDotenv();
import User from '../models/userModel.js';
import Invoice from '../models/invoiceModel.js';
import Item from '../models/itemModel.js';
import Task from '../models/taskModel.js';
import { InvoiceItem } from '../models/relationshipModels.js';

const sequelize = new Sequelize({
  database: process.env.DBNAME,
  username: process.env.DBUSERNAME,
  password: process.env.DBPWD,
  host: process.env.DBHOST,
  dialect: 'postgres',
});

sequelize.addModels([User, Task, Invoice, Item, InvoiceItem]);

export default sequelize;
