<template>
   <div id="app">
    <v-app id="inspire">
        <v-content>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                    <v-toolbar-title id="Login">Login</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-tooltip bottom>
                    </v-tooltip>
                </v-toolbar>
                <v-card-text>
                    <v-form>
                    <v-text-field v-model="loginUserInput" prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
                    <v-text-field v-model="loginUserPw" prepend-icon="lock" name="password" label="Password" id="password" type="password"></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer>
                        <p>{{error}}</p>
                    </v-spacer>
                    <v-btn color="primary" @click="loginUser()">Login</v-btn>
                </v-card-actions>
                </v-card>
            </v-flex>
            </v-layout>
        </v-container>
        </v-content>
    </v-app>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import App from '../App.vue';

@Component
export default class Login extends Vue {
    private loginUserInput: string = '';
    private loginUserPw: string = '';
    private error: string = '';

    @Prop({ type: Object as () => User })
    private user1: User = {
        id: 1,
        username: 'user1',
        email: 'Leer',
        password: '1234',
        picture: 'Leer',
        status: 'Leer',
        chats: [1, 2]
    };
    private user2: User = {
        id: 2,
        username: 'user2',
        email: 'Leer',
        password: '1234',
        picture: 'Leer',    
        status: 'Leer',
        chats: [1, 2]
    };
    
    private loginUser() {
       
        if (this.loginUserInput === this.user1.username) {
        
            if (this.loginUserPw === this.user1.password) {
                this.$store.commit('changeUser', this.user1);
                // this.$store.state.loggedInUser.username = this.user1.username;
                this.$router.push('/chat')
                console.log(this.user1.username + 'ist eingeloggt');
            } else {
                this.error = 'Passwort ist falsch.';
                console.log('Passwort ist falsch');
            }

        } else if(this.loginUserInput === this.user2.username){

            if(this.loginUserPw === this.user2.password){
                this.$store.commit('changeUser', this.user2);
                // this.$store.state.loggedInUser.username = this.user2.username;
                this.$router.push('/chat')
                console.log(this.user2.username + 'ist eingeloggt');
            } else {
                                this.error = 'Passwort ist falsch.';

                console.log('Passwort ist falsch');
            }
        } else {
            this.error = 'Benutzername oder Passwort ist falsch';
            console.log('Benutzername oder Passwort ist falsch ');

        }
    }

}
</script> 

