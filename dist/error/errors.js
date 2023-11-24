export class CustomError extends Error {
    status;
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
export class NotFound extends CustomError {
    constructor() {
        super('Resource not found', 404);
    }
}
export class BadRequest extends CustomError {
    constructor(message = 'Bad Request') {
        super(message, 400);
    }
}
export class Unauthorized extends CustomError {
    constructor(message = 'Unauthorized') {
        super(message, 400);
    }
}
//# sourceMappingURL=errors.js.map