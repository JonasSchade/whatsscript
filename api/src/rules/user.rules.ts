import { check, validationResult, oneOf } from 'express-validator/check';
import { return422 } from '../utils/express.utils';

export const UserRules = {
    create: [
        check('username').exists().withMessage('username already exists')
            .isLength({min: 4}).withMessage('must be at least 4 chars long'),
        check('email').isEmail().withMessage('is not a email')
            .exists().withMessage('email already exists'),
        check('password').isLength({min: 5}).withMessage('must be at least 5 chars long')
            .not().isIn(['12345', 'password']).withMessage('Do not use a common word as the password'),
        check('status'),
        check('picture'),
        return422
    ],
    delete: [
        check('id').exists().withMessage('user doesnt exists'),
        return422
    ],
    update: [
        check('id').exists().withMessage('user doesnt exists'),
        oneOf([
        check('username').exists().withMessage('username doesnt exists'),
        check('email').isEmail().withMessage('is not a email')
            .exists().withMessage('email already exists'),
        check('picture').exists(),
        check('status').exists()
        ]),
        return422
    ]
};



