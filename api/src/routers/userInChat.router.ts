import { Router, Request, Response } from 'express';
import { User } from '../models/user.model';
import { Chat } from '../models/chat.model';
import { wrapAsync, globalErrorHandler } from '../utils/express.utils';
import { UserInChat } from '../models/userInChat.model';
import { matchedData } from 'express-validator/filter';


export const UserInChatRouter = Router();

UserInChatRouter.get('/', wrapAsync(async (req: Request, res: Response) => {
    const users: UserInChat[] = await UserInChat.findAll();

    res.status(200).json(users);
}));

UserInChatRouter.get('/:userId', wrapAsync(async (req: Request, res: Response) => {
    const userInChat: User|null = await User.findByPk(req.params.userId);

    if (userInChat === null) throw { status: 404, responseMessage: `userInChat with userId ${req.body.userId} not found`};

    res.status(200).json(userInChat);
}));

// delete UserInChat, User aus einem Chat löschen
UserInChatRouter.delete('/:userId', wrapAsync(async (req: Request, res: Response) => {
    const userInChat: UserInChat[]|null = await UserInChat.findAll({
        where: {
          userId: req.params.userId
        }
      });

    if (userInChat.length === 0) throw { status: 404, responseMessage: `userInChat with userId ${req.body.userId} doesnt exists`};

    await userInChat[0].destroy();

    res.status(200).end();
}));

// create new UserInChat, User einem Chat hinzufügen
UserInChatRouter.post('/', wrapAsync(async (req: Request, res: Response) => {
    let chat: Chat|null = await Chat.findByPk(req.body.chatId);
    chat = await chat.save();

    const user = new User(req.body.user);

    // @ts-ignore
    chat.addUser(user);

    res.status(200).json(req.params.user);
}));

UserInChatRouter.use(globalErrorHandler);
