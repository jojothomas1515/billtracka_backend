import http from 'http';
import app from './index';
import db from './config/dbConfig';

const server = http.createServer(app);

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 5000;

db.authenticate({ retry: { timeout: 1000, max: 3 } })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('Could not connect to database');
    console.error(err);
    process.exit(10);
  });
