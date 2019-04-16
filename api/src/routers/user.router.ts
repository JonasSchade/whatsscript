import { Router, Request, Response } from 'express';
import { User } from '../models/user.model';
import { wrapAsync, globalErrorHandler } from '../utils/express.utils';
import { userInfo } from 'os';
import { Model } from 'sequelize/types';

export const UserRouter = Router();

UserRouter.get('/', wrapAsync(async (req: Request, res: Response) => {
    const users: User[] = await User.findAll(); 

    res.status(200).json(users);
}));



UserRouter.get('/:id', wrapAsync(async (req: Request, res: Response) => {
    const user: User|null = await User.findByPk(req.params.id, { attributes: ['picture'] });
   
    if (user === null) throw { status: 404, responseMessage: `user with id ${req.body.id} not found`};
   
    const email = user.email;
    const username = user.username;
    const status = user.status;
    const picture = user.picture;

    res.status(200).json(user);
}));


//delete User
UserRouter.delete('/:id', wrapAsync(async (req: Request, res: Response)=> {
    const user: User|null = await User.findByPk(req.params.id);

    if (user === null) throw { status: 404, responseMessage: `user with id ${req.body.id} doesnt exists`};

    await user.destroy();

    res.status(200).end();
}));

//create new User, User der Datenbank hinzufügen
UserRouter.post('/:id', wrapAsync(async (req: Request, res: Response)=> {
    const user: User|null = await User.findByPk(req.params.id);

    if (user != null) throw { status: 404, responseMessage: `user with id ${req.body.id} already exists`};

    User.create({}) //??

    res.status(200).json(user);
}));

//update existing User
UserRouter.put('/:id', wrapAsync(async (req: Request, res: Response)=> {
    const user: User|null = await User.findByPk(req.params.id);

    if (user === null) throw { status: 404, responseMessage: `user with id ${req.body.id} not found`};

    user.update({}); // alles einzeln reinschreiben ???

    res.status(200).json(user);
}));



UserRouter.use(globalErrorHandler);
