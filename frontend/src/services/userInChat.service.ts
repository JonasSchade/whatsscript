import * as rp from 'request-promise-native';
import { User } from '../models/user';
import { Chat } from '../models/chat';
import store from '@/store';

export class UserInChatService {

    public static addUserToChat(user: User, chatId: number): void {
        const options = {
            method: 'POST',
            uri: 'http://localhost:3000/userInChat/',
            headers: { Authorization: store.state.token },
            body: {
                user,
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
