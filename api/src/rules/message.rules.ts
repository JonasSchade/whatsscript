import { check, validationResult, oneOf } from 'express-validator/check';
import { return422 } from '../utils/express.utils';

export const MessageRules = {
    create: [
        check('id').exists().withMessage('Message already exists'),
        return422
    ],
    delete: [
        check('id').exists().withMessage('Message doesnt exists'),
        return422
    ]
    /*update: [
        check('id').exists().withMessage('Message doesnt exists'),
        return422
    ]*/ // bis jetzt kann man keine Messages ändern
};
