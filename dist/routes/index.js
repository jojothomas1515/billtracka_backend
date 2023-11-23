"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const defaultRouter = (0, express_1.Router)();
defaultRouter.get('/status', (req, res) => {
    return res.json({ status: 'alive', message: 'it a wonderful day' });
});
exports.default = defaultRouter;
