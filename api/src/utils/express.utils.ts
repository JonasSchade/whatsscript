import { validationResult } from 'express-validator/check';

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
