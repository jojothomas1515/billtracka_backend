import { Sequelize } from 'sequelize-typescript';
import { configDotenv } from 'dotenv';
configDotenv();

const sequelize = new Sequelize({
  database: process.env.DBNAME,
  username: process.env.DBUSERNAME,
  password: process.env.DBPWD,
  host: process.env.DBHOST,
  dialect: 'postgres',
  models: [__dirname + '/models'],
});

export default sequelize;
