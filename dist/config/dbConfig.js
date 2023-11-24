import { Sequelize } from 'sequelize-typescript';
import { configDotenv } from 'dotenv';
configDotenv();
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';
//
// const __dirname = dirname(fileURLToPath(import.meta.url));
const sequelize = new Sequelize({
    database: process.env.DBNAME,
    username: process.env.DBUSERNAME,
    password: process.env.DBPWD,
    host: process.env.DBHOST,
    dialect: 'postgres',
    // models: [__dirname + '/../models'],
});
export default sequelize;
//# sourceMappingURL=dbConfig.js.map