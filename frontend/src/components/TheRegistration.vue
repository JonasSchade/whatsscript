<template>
  <div id="app">
    <v-app id="inspire">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                  <v-toolbar-title id="Login">Registrieren</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-tooltip bottom></v-tooltip>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      v-model="loginUserInput"
                      prepend-icon="person"
                      name="login"
                      label="Login"
                      type="text"
                      autofocus
                    ></v-text-field>
                    <v-text-field
                      v-model="loginUserPw"
                      prepend-icon="lock"
                      name="password"
                      label="Password"
                      id="password"
                      type="password"
                    ></v-text-field>
                    <v-text-field
                      v-model="loginUserEmail"
                      prepend-icon="email"
                      name="email"
                      label="Email"
                      id="email"
                      type="email"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer>
                    <p class="error-message">{{error}}</p>
                  </v-spacer>
                  <v-btn color="primary" @click="loginUser()">Jetzt registrieren!</v-btn>
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
import bcrypt from 'bcryptjs';

@Component
export default class Login extends Vue {
  private loginUserInput: string = '';
  private loginUserPw: string = '';
  private loginUserEmail: string = '';
  private error: string = '';
  private salt: string = '$2a$10$WsO3Fc2FYMaS6QmGeWhpfu';

  private async loginUser() {
    const existingUsers: User[] = await this.getUser(this.loginUserInput);
    const isUsernameFree: boolean = existingUsers.length < 1;

    if (isUsernameFree) {
      const newUser: User = {
        username: this.loginUserInput,
        email: this.loginUserEmail,
        password: await this.encrypt(this.loginUserPw),
        picture: '',
        status: '',
        chats: []
      };
      await UserService.addUser(newUser);
      this.$store.commit('changeUser', newUser);
      this.$router.push('/start');
      console.log(newUser.username + 'ist eingeloggt');
    } else {
      this.error = 'Dieser Username ist bereits vergeben.';
    }
  }
  private async getUser(username: string): Promise<User[]> {
    const userToReturn = await UserService.getUsersByUsername(username);
    return userToReturn;
  }

  private async encrypt(plainPassword: string): Promise<string> {
    return await  bcrypt.hashSync(plainPassword, this.salt);
  }
}
</script>

<style lang="scss">
  .error-message {
    margin-left: 40px;
    color: #cc5b55;
    font-weight: bold;
  }
</style>
