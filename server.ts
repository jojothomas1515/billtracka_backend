import http from 'http';
import app from './index';

const server = http.createServer(app);

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 5000;

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
