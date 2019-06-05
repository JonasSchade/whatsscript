<template>
  <div class="container">
        <v-img :aspect-ratio="16/9" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
        </v-img>
          <div class="chatname-wrapper">
            <v-text-field
            single-line
            label="Chatname" 
            append-icon="edit"
            :value="chat.chatname">
            </v-text-field>
          </div>
            <div>
              <p class="subheading">Teilnehmer:</p>
              <v-list two-line>
                <template v-for="(user, index) in usersInChat">
                  <v-divider v-if="index!=0"  :key="index"></v-divider>

                  <v-list-tile :key="user.username" avatar>
                    <v-list-tile-avatar>
                      <img
                        :src="user.picture"
                        @error="user.picture=`${publicPath}images/user_icon.svg`"
                      >
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                      <v-list-tile-title v-html="user.username"></v-list-tile-title>
                      <v-list-tile-sub-title v-html="user.status"></v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-btn flat fab @click="deleteUserFromChat(user.id)">
                      <v-icon>cancel</v-icon>
                    </v-btn>
                  </v-list-tile>
                </template>
                 <v-divider/>
              </v-list>
              <div class="--center-content">
              <v-btn round class="add-btn" color="primary">
                  <v-icon class="__icon">add</v-icon>Neuer Teilnehmer
                </v-btn>
              </div>
            </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { UserService } from '../services/user.service';
import { MessageService } from '../services/message.service';
import { User } from '../models/user';
import { Message } from '../models/message';
import { Chat } from '../models/chat';
import MessageComponent from '@/components/Message.vue';
import moment from 'moment';
import io from 'socket.io-client';
import { ChatService } from '../services/chat.service';

@Component({
  components: { MessageComponent }
})
export default class ChatSettings extends Vue {
  private messageToSend: string = '';
  private message: string = '';
  private socket = io('localhost:3000');
  private publicPath: string = process.env.BASE_URL || '/';
  private status: string = 'Kein Status';
  private user?: User;
  private chatname?: string = 'Kein Chatname';
  private usersInChat: User[] = [];

  @Prop()
  private chat: Chat = {id: 0, chatname: 'Kein Name', picture: '', users: []};

  private mounted() {
    this.user = this.$store.state.loggedInUser;
    this.setUsersInChat();
  }

  private async getUser(userId: number): Promise<User> {
    try {
      const userToReturn = await UserService.getUser(1);
      return userToReturn;
    } catch (err) {
      console.error('Error: ', err.message);
      throw err;
    }
  }

  private addUser() {
    if (!this.user) return;
    UserService.addUser(this.user);
  }

  private getUsername(userId: number): string {
    const userWithId = this.usersInChat.find(user => user.id === userId);
    if (userWithId !== undefined) {
      return userWithId.username;
    }
    return '';
  }

  @Watch('chat')
  private async setUsersInChat() {
      if (this.chat.id !== undefined) {
        this.usersInChat = await ChatService.getUsersInChat(this.chat.id);
      }
  }

  private deleteUserFromChat(userId: number): void {}
}
</script>

<style lang="scss">

.--center-content {
  display: flex;
  justify-content: center;
}

.add-btn {
  margin-top: 20px;
  margin-bottom: 30px;
  .__icon {
    margin-right: 10px;
  }
}

.chatname-wrapper {
  background-color: 'red';
}

</style>