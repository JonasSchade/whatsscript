import { Router, Request, Response } from 'express';
import { Chat } from '../models/chat.model';
import { wrapAsync, globalErrorHandler } from '../utils/express.utils';

export const ChatRouter = Router();

ChatRouter.get('/', wrapAsync(async (req: Request, res: Response) => {
    const chats: Chat[] = await Chat.findAll();

    res.status(200).json(chats);
}));

ChatRouter.get('/:id', wrapAsync(async (req: Request, res: Response) => {
    const chat: Chat|null = await Chat.findByPk(req.params.id);

    if (chat === null) throw { status: 404, responseMessage: `chat with id ${req.body.id} not found`};

    const chatname = chat.chatname;
    const picture = chat.picture;
    res.status(200).json(chat);
}));

//delete chat
ChatRouter.delete('/:id', wrapAsync(async (req: Request, res: Response) => {
    const chat: Chat|null = await Chat.findByPk(req.params.id);

    if (chat === null) throw { status: 404, responseMessage: `chat with id ${req.body.id} not found`};

    await chat.destroy();
    res.status(200).end();
}));

//create chat
ChatRouter.post('/:id', wrapAsync(async (req: Request, res: Response) => {
    const chat: Chat|null = await Chat.findByPk(req.params.id);

    if (chat === null) throw { status: 404, responseMessage: `chat with id ${req.body.id} not found`};

    Chat.create();
    res.status(200).json(chat);
}));

//update chat
ChatRouter.put('/:id', wrapAsync(async (req: Request, res: Response) => {
    const chat: Chat|null = await Chat.findByPk(req.params.id);

    if (chat === null) throw { status: 404, responseMessage: `chat with id ${req.body.id} not found`};

    chat.update({});
    res.status(200).end();
}));

ChatRouter.use(globalErrorHandler);