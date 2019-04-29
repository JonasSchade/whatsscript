import * as rp from "request-promise-native";

import { User } from '../models/user';

class UserService {
    constructor(){

    }

    async deleteUser(userId: number){
        rp.delete("localhost:3030/api/user/${userId}");
    }

    addUser(user: User){

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
        
        let user: User;
        
        return response;
    }

    async getUsersForChat(userId: number, chatId: number){

    }


}