import { check } from 'express-validator/check';


export const AuthRules = {
    login: [
        check('username').exists(),
        check('password').exists()
    ]
};
