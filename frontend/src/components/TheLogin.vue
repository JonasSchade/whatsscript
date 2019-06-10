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
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer>
                    <p class="error-message">{{error}}</p>
                  </v-spacer>
                  <v-btn color="primary" @click="loginUser()">Login</v-btn>
                </v-card-actions>
              </v-card>
              <v-layout justify-center>
                <v-btn @click="$router.push('/registration')" flat>Neu hier? Jetzt registrieren!</v-btn>
              </v-layout>
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
import passwordHash from 'password-hash';

@Component
export default class Login extends Vue {
  private loginUserInput: string = '';
  private loginUserPw: string = '';
  private error: string = '';
  private  rounds: number = 1000;

  private async loginUser() {
    const userToLogin: User[] = await UserService.getUsersByUsername(this.loginUserInput);
    const userExists: boolean = userToLogin.length > 0;
    if (userExists) {
      if (this.verifyPassword(this.loginUserPw, userToLogin[0].password)) {
        this.$store.commit('changeUser', userToLogin[0]);
        this.$router.push('/chat');
        console.log(userToLogin[0].username + 'ist eingeloggt');
      } else {
        this.error = 'Passwort ist falsch.';
      }
    } else {
      this.error = 'Dieser User existiert nicht.';
    }
  }

  private verifyPassword(plainPassword: string, hashedPassword: string): boolean {
    return passwordHash.verify(plainPassword, hashedPassword);
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


