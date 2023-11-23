"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordValidator = void 0;
const errors_1 = require("../error/errors");
function passwordValidator(password) {
    const containUppercase = /[A-Z]/;
    const containLowercase = /[a-z]/;
    const containDigit = /\d/;
    const validLength = /[a-zA-Z/d-]{8,}/;
    if (!validLength.test(password)) {
        throw new errors_1.BadRequest('Password must be of 8 or more length');
    }
    if (!containUppercase.test(password)) {
        throw new errors_1.BadRequest('Password must contain uppercase character');
    }
    if (!containLowercase.test(password)) {
        throw new errors_1.BadRequest('Password must contain lowercase character');
    }
    if (!containDigit.test(password)) {
        throw new errors_1.BadRequest('Password must contain numeric character');
    }
}
exports.passwordValidator = passwordValidator;
