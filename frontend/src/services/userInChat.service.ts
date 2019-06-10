import * as rp from 'request-promise-native';
import { User } from '../models/user';
import { Chat } from '../models/chat';

export class UserInChatService {

    public static addUserToChat(userId: number, chatId: number): void {
        const options = {
            method: 'POST',
            uri: 'http://localhost:3000/userInChat/',
            body: {
                userId: userId,
                chatId: chatId
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
