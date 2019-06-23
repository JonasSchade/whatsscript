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
import { LoginService } from '../services/login.service';
import { User } from '../models/user';
import App from '../App.vue';
import bcrypt from 'bcryptjs';

@Component
export default class Login extends Vue {
  private loginUserInput: string = '';
  private loginUserPw: string = '';
  private error: string = '';
  private salt: string = '$2a$10$WsO3Fc2FYMaS6QmGeWhpfu';

private async loginUser() {
    const user: User|null =
    await LoginService.loginUser(this.loginUserInput, await bcrypt.hashSync(this.loginUserPw, this.salt));

    if (user === null) {
      this.error = 'Username oder Passwort stimmt nicht';
      return;
    }

    this.$store.commit('changeUser', user);
    this.$router.push('/chat');

    /*
    const userExists: boolean = userToLogin.length > 0;
    if (userExists) {
      if (this.verifyPassword(this.loginUserPw, userToLogin[0].password)) {
        
        console.log(userToLogin[0].username + 'ist eingeloggt');
      } else {
        this.error = 'Passwort ist falsch.';
      }
    } else {
      this.error = 'Dieser User existiert nicht.';
    }
    */
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


