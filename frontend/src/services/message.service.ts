import * as rp from 'request-promise-native';

import { Message } from '../models/message';
import { User } from '../models/user';

export class MessageService {

    public static async deleteMessage(messageId: number) {
        rp.delete('http://localhost:3000/message/' + messageId);
    }

    public static addMessage(message: Message): void {
        const options = {
            method: 'POST',
            uri: 'http://localhost:3000/message/',
            body: {
                content: message.content,
                sent: message.sent,
                read: message.read,
                chatId: message.chatId,
                userId: message.userId
            },
            json: true // Automatically stringifies the body to JSON
        };

        try {
            rp.post(options);
        } catch (err) {
            throw new Error('Error in addMessage()');
        }
    }

    public static async updateMessage(messageId: number, message: Message) {
        const options = {
            method: 'PUT',
            uri: 'http://localhost:3000/message/' + messageId,
            body: {
                content: message.content,
                sent: message.sent,
                read: message.read,
                chatId: message.chatId,
                userId: message.userId
            },
            json: true // Automatically stringifies the body to JSON
        };

        try {
            rp.put(options);
        } catch (err) {
            throw new Error('Error in updateMessage()');
        }
    }

    public static async getMessage(messageId: number): Promise<Message> {
        let response: Message;

        try {
            const body = await rp.get('http://localhost:3000/message/' + messageId);
            response = JSON.parse(body);
        } catch (err) {
            throw new Error('Error in getMessage()');
        }

        return response;
    }

    public static async getMessagesInChat(chatId: number): Promise<Message[]> {
        let response: Message[];

        try {
            const body = await rp.get('http://localhost:3000/message/chat/' + chatId);
            response = JSON.parse(body);
        } catch (err) {
            throw new Error('Error in getMessagesForChat()');
        }

        return response;
    }

}
