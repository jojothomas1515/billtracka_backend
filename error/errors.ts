export class CustomError extends Error {
    status: number;
    constructor(message: string, status: number) {
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
    constructor(message: string = 'Bad Request') {
        super(message, 400);
    }
}
export class Unauthorized extends CustomError {
    constructor(message: string = 'Unauthorized') {
        super(message, 400);
    }
}
