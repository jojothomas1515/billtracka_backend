import { Request, Response, NextFunction } from 'express';
import { Unauthorized } from '../error/errors';
import { passwordValidator } from '../util/validator';

export async function signUp(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response> {
    const { email, phone, password } = req.body;

    if (!email && !phone) {
        throw new Unauthorized('Email or Phone Number is required to signup');
    }
    passwordValidator(password);
    return res.json({ message: 'do nothing' });
}
