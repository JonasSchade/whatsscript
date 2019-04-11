import { Router, Request, Response } from 'express';
import { User } from '../models/user.model';
import { wrapAsync, globalErrorHandler } from '../utils/express.utils';

export const UserRouter = Router();

UserRouter.get('/', wrapAsync(async (req: Request, res: Response) => {
    const users: User[] = await User.findAll();

    res.status(200).json(users);
}));

UserRouter.get('/:id', wrapAsync(async (req: Request, res: Response) => {
    const user: User|null = await User.findByPk(req.params.id);

    if (user === null) throw { status: 404, responseMessage: `user with id ${req.body.id} not found`};

    res.status(200).json(user);
}));

UserRouter.use(globalErrorHandler);
