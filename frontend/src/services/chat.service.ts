import * as rp from 'request-promise-native';

import { Chat } from '../models/chat';
import { User } from '../models/user';
import store from '@/store';

export class ChatService {

    public static async deleteChat(chatId: number) {
        rp.delete('http://localhost:3000/chat/' + chatId);
    }

    public static async addChat(chat: Chat): Promise<Chat> {
        const options = {
            method: 'POST',
            uri: 'http://localhost:3000/chat',
            body: {
                chatname: chat.chatname,
                picture: chat.picture,
                users: chat.users,
                messages: chat.messages,
            },
            json: true // Automatically stringifies the body to JSON
        };
        let response: Chat;
        try {
            const body = await rp.post(options);
            response = JSON.parse(body);
            // rp.post(options);
        } catch (err) {
            throw new Error('Error in addChat()');
        }

        return response;
    }

    public static async updateChat(chatId: number, chat: Chat) {
        const options = {
            method: 'PUT',
            uri: 'http://localhost:3000/chat/' + chatId,
            body: {
                chatname: chat.chatname,
                picture: chat.picture,
                users: chat.users
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
            const body = await rp.get('http://localhost:3000/chat/' + chatId, { headers: { Authorization: store.state.token }});
            response = JSON.parse(body);
        } catch (err) {
            throw new Error('Error in getChat()');
        }
     
        return response;
    }

    public static async getAllChats(): Promise<Chat[]> {
        let response: Chat[];

        try {
            const body = await rp.get('http://localhost:3000/chat', { headers: { Authorization: store.state.token }});
            response = JSON.parse(body);
        } catch (err) {
            throw new Error('Error in getAllChats()');
        }
     
        return response;
    }

    public static async getUsersInChat(chatId: number): Promise<User[]> {
        let response: User[];

        try {
            const body = await rp.get('http://localhost:3000/chat/' + chatId + '/users');
            response = JSON.parse(body);
        } catch (err) {
            throw new Error('Error in getUsersInChat()');
        }

        return response;
    }

    public static async deleteUserFromChat(userId: number) {
        rp.delete('http://localhost:3000/userInChat/' + userId);
    }

    public static addUserToChat(userId: number, chatId: number): void {
        const options = {
            method: 'POST',
            uri: 'http://localhost:3000/userInChat/',
            body: {
                userId,
                chatId
            },
            json: true // Automatically stringifies the body to JSON
        };
        
        try {
            rp.post(options);
        } catch (err) {
            throw new Error('Error in addUserToChat()');
        }
    }

}
