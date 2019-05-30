import { Chat } from './chat';

export interface User {
    id?: number;
    username: string;
    email: string;
    password: string;
    picture: string;
    status: string;
    chats: number[];

}
