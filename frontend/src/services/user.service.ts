import * as rp from "request-promise-native";

import { User } from '../models/user';

export class UserService {
    constructor(){

    }

    async deleteUser(userId: number){
        rp.delete("localhost:3030/api/user/${userId}");
    }

    addUser(user: User){
        var options = {
            method: 'POST',
            uri: 'localhost:3030/api/user/post',
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
        
        try{
            rp.post(options)
        } catch (err){
            throw new Error("Error in addUser()");
        }
    }

    async updateUser(user: User){

    }

    static async getUser(userId: number): Promise<User>{
        let response: User;
        
        try {
            const body =await rp.get("localhost:3030/api/user/${userId}")
            response = JSON.parse(body);
        } catch (err){
            throw new Error("Error in getUser()");
        }
        
        return response;
    }

    async getUsersForChat(chatId: number): Promise<User[]>{
        let response: User[];

        try {
            const body =await rp.get("localhost:3030/api/userInChat/${chatId}")
            response = JSON.parse(body);
        } catch (err){
            throw new Error("Error in getUsersForChat()");
        }
        
        return response;
    }


}