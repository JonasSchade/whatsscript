import { Message } from './message';

export interface Chat {
    id?: number;
    chatname: string;
    picture: string;
    users: number[];
    messages: Message[];

}
