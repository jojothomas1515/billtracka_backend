"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unauthorized = exports.BadRequest = exports.NotFound = exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
exports.CustomError = CustomError;
class NotFound extends CustomError {
    constructor() {
        super('Resource not found', 404);
    }
}
exports.NotFound = NotFound;
class BadRequest extends CustomError {
    constructor(message = 'Bad Request') {
        super(message, 400);
    }
}
exports.BadRequest = BadRequest;
class Unauthorized extends CustomError {
    constructor(message = 'Unauthorized') {
        super(message, 400);
    }
}
exports.Unauthorized = Unauthorized;
