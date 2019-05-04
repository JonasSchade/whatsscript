import { Chat } from './chat';

export interface User {   
    username: string;
    email: string;
    password: string;
    picture: string;
    status: string;
    chats: Chat[];

}
