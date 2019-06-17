import { Router, Request, Response } from 'express';
import { User } from '../models/user.model';
import { wrapAsync, globalErrorHandler } from '../utils/express.utils';
import { AuthRules } from '../rules/auth.rules';
import { validationResult } from 'express-validator/check';
import { matchedData } from 'express-validator/filter';
import { sign } from '../utils/jwt.utils';
import { UserRules } from '../rules/user.rules';
import { UserRouter } from './user.router';
export const AuthRouter = Router();

// login
AuthRouter.post('/login', AuthRules.login, wrapAsync(async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) throw { status: 401 };

    const queryData = matchedData(req);
    // {
    //     username: 'Meh',
    //     password: '....'
    // }

    const user: User|null = await User.findOne({ where: queryData });
    if (user === null) throw { status: 403 };

    // Generate token
    const token = sign(user.get());

    // Cookie mit token erstellen
    res.cookie('whatsscript', token, { domain: '127.0.0.1', httpOnly: true, secure: false});

    // Cookie schicken
    res.status(200).json({ token });

}));

AuthRouter.post('/logout', wrapAsync(async (req: Request, res: Response) => {
    res.clearCookie('whatsscript').status(200).end();

}));

AuthRouter.post('/register', UserRules.create, wrapAsync(async (req: Request, res: Response) => {
    // erstelle neuen User
    const queryData = matchedData(req);
    const user = new User(queryData);
    await user.save();
    // steck User in Token
    const token = sign(user.get());
    // schick Token ab
    res.cookie('whatsscript', token, { domain: '127.0.0.1', httpOnly: true, secure: false});
    res.status(200).json({ token });
}));


AuthRouter.use(globalErrorHandler);
