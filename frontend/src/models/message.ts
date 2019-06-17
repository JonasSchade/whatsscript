import { User } from './user';
import { Chat } from './chat';

export interface Message {
    content: string;
    sent: string;
    read: boolean;
    chatId: number;
    userId: number;
    user: User;

}
