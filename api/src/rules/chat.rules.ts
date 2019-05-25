import { check, validationResult, oneOf } from 'express-validator/check';
import { return422 } from '../utils/express.utils';

export const ChatRules = {
    create: [
        check('id').exists().withMessage('Chat already exists'),
        check('chatName').isLength({min: 1}).withMessage('must be at least one char long'),
        return422
    ],
    delete: [
        check('id').exists().withMessage('Chat doesnt exists'),
        return422
    ],
    update: [
        check('id').exists().withMessage('Chat doesnt exists'),
        oneOf([
            check('chatName').isLength({min: 1}).withMessage('must be at least one char long'),
            check('picture').exists()
        ]),
        return422
    ]
};
