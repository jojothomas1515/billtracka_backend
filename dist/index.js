"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./routes"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
// const accessLog = fs.createWriteStream('/tmp/access.log', {
//     flags: 'a',
// });
const logger = (0, morgan_1.default)('dev');
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(logger);
app.use(routes_1.default);
app.use('/auth', authRouter_1.default);
app.use(errorHandler_1.errorHandler);
exports.default = app;
