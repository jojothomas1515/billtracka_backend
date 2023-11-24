import { Sequelize } from 'sequelize-typescript';
import { configDotenv } from 'dotenv';
configDotenv();
import User from '../models/userModel.js';

const sequelize = new Sequelize({
  database: process.env.DBNAME,
  username: process.env.DBUSERNAME,
  password: process.env.DBPWD,
  host: process.env.DBHOST,
  dialect: 'postgres',
});

sequelize.addModels([User]);

export default sequelize;
