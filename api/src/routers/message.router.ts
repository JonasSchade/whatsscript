import { Router, Request, Response } from 'express';
import { Message } from '../models/message.model';
import { wrapAsync, globalErrorHandler } from '../utils/express.utils';

export const MessageRouter = Router();

MessageRouter.get('/', wrapAsync(async (req: Request, res: Response) => {
    const messages: Message[] = await Message.findAll();

    res.status(200).json(messages);
}));

MessageRouter.get('/:id', wrapAsync(async (req: Request, res: Response) => {
    const message: Message|null = await Message.findByPk(req.params.id);

    if (message === null) throw { status: 404, responseMessage: `message with id ${req.body.id} not found`};

    res.status(200).json(message);
}));

MessageRouter.use(globalErrorHandler);