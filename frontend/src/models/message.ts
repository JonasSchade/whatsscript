import { User } from './user';
import { Chat } from './chat';

export interface Message {
    content: string;
    sent: string;
    read: boolean;
    chat: Chat;
    user: User;
    chatId: number;
    userId: number;

}
