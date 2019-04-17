import { Router, Request, Response } from 'express';
import { User } from '../models/user.model';
import { wrapAsync, globalErrorHandler } from '../utils/express.utils';
import { Chat } from '../models/chat.model';
import { UserInChat } from '../models/userInChat.model';

export const UserInChatRouter = Router();

UserInChatRouter.get('/', wrapAsync(async (req: Request, res: Response) => {
    //const users: User[] = await User.findAll();
    //const chat: Chat|null = await Chat.findByPk(req.param.id);
    const userInChat: UserInChat = await UserInChat.findAll();
   
    if (userInChat === null) throw {status: 404, responseMessage: 'no Users in this chat'}
    //wenn keine Users in Chat sind,Chat.destroy() Chat löschen ? dann res.status(200).end() ?
    
    res.status(200).json(userInChat);
}));

//User verlässt Chat 



UserInChatRouter.use(globalErrorHandler);