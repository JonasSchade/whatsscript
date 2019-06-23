import { validationResult } from 'express-validator/check';
import { validate, decode } from './jwt.utils';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';


export function wrapAsync(fn) {
    return (req, res, next) => {
        // Make sure to `.catch()` any errors and pass them along to the `next()`
        // middleware in the chain, in this case the error handler.
        fn(req, res, next).catch(next);
    };
}

export function globalErrorHandler(err, req, res, next) {
    console.error(err);
    res.status(err.status || 500).send(err.responseMessage || '');
}

export function return422(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    next();
}

export interface WhatsScriptRequest extends Request {
    whatsScriptUser: User;
}

export function checkAuth(req: WhatsScriptRequest, res: Response, next: NextFunction) {

    const token = req.cookies.whatsscript;
    const authHeader = req.header('Authorization');
    if (!token && !authHeader) {
        console.log('token: ' + token + 'authHeader: ' + authHeader)
        return res.status(401).end();
    } else if (token && !validate(token)) {
        return res.status(403).end();
    } else if (authHeader && !validate(authHeader)) {
        return res.status(403).end();
    }

    req.whatsScriptUser = decode(token || authHeader) as User;

    next();
}
