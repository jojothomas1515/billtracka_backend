"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const index_1 = __importDefault(require("./index"));
const dbConfig_1 = __importDefault(require("./config/dbConfig"));
const server = http_1.default.createServer(index_1.default);
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;
dbConfig_1.default.authenticate({ retry: { timeout: 1000, max: 3 } })
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
