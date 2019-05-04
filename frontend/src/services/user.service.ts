import * as rp from 'request-promise-native';

import { User } from '../models/user';

export class UserService {
    constructor() {

    }

    public async deleteUser(userId: number) {
        rp.delete('http://localhost:3000/user/' + userId);
    }

    public addUser(user: User) {
        const options = {
            method: 'POST',
            uri: 'http://localhost:3000/user/post',
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

    public async updateUser(user: User) {

    }

    public static async getUser(userId: number): Promise<User> {
        let response: User;
     
        try {
            const body = await rp.get('http://localhost:3000/user/' + userId);
            response = JSON.parse(body);
            console.log(response);
        } catch (err) {
            throw new Error('Error in getUser()');
        }
        /*
        response = {
            username: 'Timm',
            email: 'a',
            password: 'b',
            picture: 'c',
            status: 'Toller Status',
            chats: [{chatname: 'chat1', picture: 'a', users: []}]
        }
        */
        return response;
    }

    public async getUsersForChat(chatId: number): Promise<User[]> {
        let response: User[];

        try {
            const body = await rp.get('http://localhost:3000/userInChat/' + chatId);
            response = JSON.parse(body);
        } catch (err) {
            throw new Error('Error in getUsersForChat()');
        }

        return response;
    }


}
