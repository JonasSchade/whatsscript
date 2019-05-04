import { Router, Request, Response } from 'express';
import { User } from '../models/user.model';
import { wrapAsync, globalErrorHandler } from '../utils/express.utils';
import { userInfo } from 'os';
import { Model } from 'sequelize/types';
import { Chat } from '../models/chat.model';
import { UserInChat } from '../models/userInChat.model';

export const UserRouter = Router();

UserRouter.get('/', wrapAsync(async (req: Request, res: Response) => {
    const users: User[] = await User.findAll(); 

    res.status(200).json(users);
}));

UserRouter.get('/:id', wrapAsync(async (req: Request, res: Response) => {
    const user: User|null = await User.findByPk(req.params.id);
   
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
UserRouter.post('/', wrapAsync(async (req: Request, res: Response)=> {

    
    const user = new User({username: '', email: '', password: '', picture: '', status: '', chats: null });
    await user.save();

    res.status(200).json(user);
}));

//update existing User
UserRouter.put('/:id', wrapAsync(async (req: Request, res: Response)=> {
    const user: User|null = await User.findByPk(req.params.id);

    if (user === null) throw { status: 404, responseMessage: `user with id ${req.body.id} not found`};

    user.update({}); // alles einzeln reinschreiben ??? updatet der es automatisch richtig ?

    res.status(200).json(user);
}));



//User über Usernamen finden
//vllt mit findOne(), Reloading instances bei Sequelize
UserRouter.get('/:id', wrapAsync(async (req: Request, res: Response) => {
    const user: User|null = await User.findByPk(req.params.id);
   
    if (user === null) throw { status: 404, responseMessage: `user with id ${req.body.id} not found`};
   
    res.status(200).json(user);
}));

//Alle chats eines Users
UserRouter.get('/user/:id/chats', wrapAsync(async (req: Request, res: Response) => {
    const user: User|null = await User.findByPk(req.params.id, { include: [ Chat ] }); //suche bestimmten User
   
    if (user === null) throw { status: 404, responseMessage: `user with id ${req.body.id} not found`}; //User doesnt exists?

    const chats: Chat[] = user.chats;

    //weitere Beispiele wie man es machen könnte
    //const chats: Chat[] = await user.$get('chats');
    //const chats: Chat[] = await UserInChat.findAll({ where: { userId: user.id}, include: [ Chat ] })


    res.status(200).json(chats);
}));

UserRouter.use(globalErrorHandler);
