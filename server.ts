import { createServer } from 'http';
import app from './index.js';
import db from './config/dbConfig.js';

const server = createServer(app);

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 5000;

// db.authenticate()
//   .then(() => {

db.sync({ force: false }).then(() => {
  console.log('Database connected');
});
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
// })
// .catch((err) => {
//   console.log('Could not connect to database');
//   console.error(err);
//   process.exit(10);
// });
