import { Router, Request, Response } from 'express';
import { Chat } from '../models/chat.model';
import { User } from '../models/user.model';
import { Message } from '../models/message.model';
import { wrapAsync, globalErrorHandler, checkAuth, WhatsScriptRequest } from '../utils/express.utils';

export const ChatRouter = Router();

// suche alle chats eines Users
ChatRouter.get('/', [checkAuth], wrapAsync(async (req: WhatsScriptRequest, res: Response) => {
    const userId = req.whatsScriptUser.id;

    const user = await User.findByPk(userId, { include: [ { model: Chat } ] });

    res.status(200).json(user.chats);
}));

// suche bestimmten chat
ChatRouter.get('/:id', [checkAuth], wrapAsync(async (req: WhatsScriptRequest, res: Response) => {
    const chat: Chat|null = await Chat.findByPk(req.params.id, { include: [ { model: User } ] });

    if (chat === null) throw { status: 404, responseMessage: `chat with id ${req.body.id} not found`};

    const userId = req.whatsScriptUser.id;

    const user = chat.users.find(user => user.id === userId);

    if (!user) throw { status: 403, responseMessage: 'Finger weg' };

    res.status(200).json(chat);
}));

// delete chat
ChatRouter.delete('/:id', wrapAsync(async (req: Request, res: Response) => {
    const chat: Chat|null = await Chat.findByPk(req.params.id);

    if (chat === null) throw { status: 404, responseMessage: `chat with id ${req.body.id} not found`};

    await chat.destroy();
    res.status(200).end();
}));

// create chat
ChatRouter.post('/:id', wrapAsync(async (req: Request, res: Response) => {
    const chat: Chat|null = await Chat.findByPk(req.params.id);

    if (chat === null) throw { status: 404, responseMessage: `chat with id ${req.body.id} not found`};

    Chat.create();
    res.status(200).json(chat);
}));

// update chat
ChatRouter.put('/:id', wrapAsync(async (req: Request, res: Response) => {
    const chat: Chat|null = await Chat.findByPk(req.params.id);
    console.log('chatname: ' + req.body.picture);
    if (chat === null) throw { status: 404, responseMessage: `chat with id ${req.body.id} not found`};
    chat.update({
        chatname: req.body.chatname,
        picture: req.body.picture
    });
    res.status(200).end();
}));


// Alle User eines Chats
ChatRouter.get('/:id/users', wrapAsync(async (req: Request, res: Response) => {
    const chat: Chat|null = await Chat.findByPk(req.params.id, { include: [ User ] }); // suche bestimmten Chat

    if (chat === null) throw { status: 404, responseMessage: `chat with id ${req.body.id} not found`};

    const users: User[] = chat.users;

    // weitere Beispiele wie man es machen könnte
    // const chats: Chat[] = await user.$get('chats');
    // const chats: Chat[] = await UserInChat.findAll({ where: { userId: user.id}, include: [ Chat ] })


    res.status(200).json(users);
}));

ChatRouter.use(globalErrorHandler);
