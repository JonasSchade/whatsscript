import * as rp from 'request-promise-native';

import { Chat } from '../models/chat';
import { User } from '../models/user';

export class ChatService {

    public static async deleteChat(chatId: number) {
        rp.delete('http://localhost:3000/chat/' + chatId);
    }

    public static addChat(chat: Chat): void {
        const options = {
            method: 'POST',
            uri: 'http://localhost:3000/chat/',
            body: {
                chatname: chat.chatname,
                picture: chat.picture,
                user: chat.users
            },
            json: true // Automatically stringifies the body to JSON
        };
        
        try {
            rp.post(options);
        } catch (err) {
            throw new Error('Error in addChat()');
        }
    }

    public static async updateChat(chatId: number, chat: Chat) {
        const options = {
            method: 'PUT',
            uri: 'http://localhost:3000/chat/' + chatId,
            body: {
                chatname: chat.chatname,
                picture: chat.picture,
                user: chat.users
            },
            json: true // Automatically stringifies the body to JSON
        };

        try {
            rp.put(options);
        } catch (err) {
            throw new Error('Error in updateChat()');
        }
    }

    public static async getChat(chatId: number): Promise<Chat> {
        let response: Chat;

        try {
            const body = await rp.get('http://localhost:3000/chat/' + chatId);
            response = JSON.parse(body);
        } catch (err) {
            throw new Error('Error in getChat()');
        }
     
        return response;
    }

    public static async getUsersInChat(chatId: number): Promise<User[]> {
        let response: User[];

        try {
            const body = await rp.get('http://localhost:3000/usersInChat/' + chatId);
            response = JSON.parse(body);
        } catch (err) {
            throw new Error('Error in getUsersInChat()');
        }

        return response;
    }


}