import * as rp from 'request-promise-native';
import { User } from '@/models/user';
import store from '@/store';

export class LoginService {

    public static async loginUser(username: string, password: string): Promise<User|null> {
        const options = {
            method: 'POST',
            uri: 'http://localhost:3000/login',
            body: {
                username,
                password
            },
            json: true // Automatically stringifies the body to JSON
        };
        let response;
        try {
            response = await rp.post(options);
        } catch (err) {
            return null;
        }
        
        store.commit('setToken', response.token);
        
        return response.user;
    }
 
}
