"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
const sequelize = new sequelize_typescript_1.Sequelize({
    database: process.env.DBNAME,
    username: process.env.DBUSERNAME,
    password: process.env.DBPWD,
    host: process.env.DBHOST,
    dialect: 'postgres',
    models: [__dirname + '/models'],
});
exports.default = sequelize;
