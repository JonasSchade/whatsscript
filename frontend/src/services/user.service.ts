import * as rp from 'request-promise-native';

import { User } from '../models/user';
import { Chat } from '../models/chat';

export class UserService {

    public static async deleteUser(userId: number) {
        rp.delete('http://localhost:3000/user/' + userId);
    }

    public static addUser(user: User): void {
        const options = {
            method: 'POST',
            uri: 'http://localhost:3000/user/',
            body: {
                username: user.username,
                email: user.email,
                password: user.password,
                picture: user.picture,
                status: user.status,
                chats: user.chats
            },
            json: true // Automatically stringifies the body to JSON
        };
        
        try {
            rp.post(options);
        } catch (err) {
            throw new Error('Error in addUser()');
        }
    }

    public static async updateUser(userId: number, user: User) {
        const options = {
            method: 'PUT',
            uri: 'http://localhost:3000/user/' + userId,
            body: {
                username: user.username,
                email: user.email,
                password: user.password,
                picture: user.picture,
                status: user.status,
                chats: user.chats
            },
            json: true // Automatically stringifies the body to JSON
        };

        try {
            rp.put(options);
        } catch (err) {
            throw new Error('Error in updateUser()');
        }
    }

    public static async getUser(userId: number): Promise<User> {
        let response: User;

        try {
            const body = await rp.get('http://localhost:3000/user/' + userId);
            response = JSON.parse(body);
        } catch (err) {
            throw new Error('Error in getUser()');
        }

        return response;
    }
    
    public static async getUsersByUsername(username: string): Promise<User[]> {
        let response: User[];

        try {
            const body: User[]|string = await rp.get('http://localhost:3000/user/username/' + username);

            response = typeof body === 'string' ? JSON.parse(body) : body;
        } catch (err) {
            throw new Error('Error in getUserByUsername()');
        }

        return response;
    }

    public static async getUsersForChat(chatId: number): Promise<User[]> {
        let response: User[];

        try {
            const body = await rp.get('http://localhost:3000/userInChat/' + chatId);
            response = JSON.parse(body);
        } catch (err) {
            throw new Error('Error in getUsersForChat()');
        }

        return response;
    }

    public static async getAllUsers(): Promise<User[]> {
        let response: User[];

        try {
            const body = await rp.get('http://localhost:3000/user');
            response = JSON.parse(body);
        } catch (err) {
            throw new Error('Error in getAllUsers(): ' + err);
        }
        return response;
    }

    public static async getAllChatsForUser(userId: number): Promise<Chat[]> {
        let response: Chat[];
        try {
            const body = await rp.get('http://localhost:3000/user/' + userId + '/chats');
            response = JSON.parse(body);
        } catch (err) {
            throw new Error('Error in getAllChatsForUser()');
        }
        return response;
    }

}
