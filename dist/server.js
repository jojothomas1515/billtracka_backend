"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const index_1 = __importDefault(require("./index"));
const server = http_1.default.createServer(index_1.default);
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
