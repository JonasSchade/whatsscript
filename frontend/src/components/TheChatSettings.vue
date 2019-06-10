<template>
  <div class="container">
        <v-img :aspect-ratio="16/9" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
          <div class="chatname-wrapper">
            <v-text-field
            single-line
            label="Chatname" 
            append-icon="edit"
            :value="chat.chatname"
            class="__textfield">
            </v-text-field>
          </div>
        </v-img>
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
              <div class="user-to-add-wrapper" v-if="this.userToAddVisible">
                <p class="subheading">Teilnehmer hinzufügen:</p>
                <v-list class="user-to-add-list" two-line>
                  <template v-for="(user, index) in usersNotInChat">
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
                      <v-btn flat fab @click="addUserToChat(user)">
                        <v-icon>add</v-icon>
                      </v-btn>
                    </v-list-tile>
                  </template>
                  <v-divider/>
                </v-list>
              </div>
              <div class="--center-content">
              <v-btn round class="add-btn" color="primary" @click="userToAddVisible=true" v-if="!userToAddVisible">
                  <v-icon class="__icon">add</v-icon>Neuer Teilnehmer
                </v-btn>
                <v-btn round class="add-btn" color="primary" @click="userToAddVisible=false" v-if="userToAddVisible">
                  Abbrechen
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
import { UserInChatService } from '../services/userInChat.service';

@Component({
  components: { MessageComponent }
})
export default class ChatSettings extends Vue {
  private publicPath: string = process.env.BASE_URL || '/';
  private status: string = 'Kein Status';
  private user?: User;
  private usersInChat: User[] = [];
  private usersNotInChat: User[] = [];
  private userToAddVisible: boolean = false;

  @Prop()
  private chat: Chat = {id: undefined, chatname: 'Kein Name', picture: '', users: []};

  private mounted() {
    this.user = this.$store.state.loggedInUser;
    this.setUsersInChat();
    this.setUsersNotInChat();
  }

  @Watch('chat')
  private async setUsersInChat() {
      if (this.chat.id !== undefined) {
        this.usersInChat = await ChatService.getUsersInChat(this.chat.id);
      }
  }

  @Watch('usersInChat')
  private async setUsersNotInChat() {
      if (this.chat.id !== undefined) {
        let allUsers = await UserService.getAllUsers();
        this.usersInChat.forEach(userInChat => {
          allUsers.forEach(user => {
            if (user.id === userInChat.id) {
              allUsers = allUsers.filter(u => u.id !== user.id);
            }
          });
        });
        this.usersNotInChat = allUsers;
      }
  }

  private async deleteUserFromChat(userId: number) {
    if (this.usersInChat.length > 1) {
      await ChatService.deleteUserFromChat(userId);
      this.usersInChat = this.usersInChat.filter(u => u.id !== userId);
    }
  }

  private async addUserToChat(user: User) {
    if (user.id !== undefined && this.chat.id !== undefined) {
      await UserInChatService.addUserToChat(user, this.chat.id);
      this.usersInChat.push(user);
    }
  }

}
</script>

<style lang="scss">

.user-to-add-wrapper {
  margin-top: 30px;
}

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
  position: absolute;
  background-color: rgba(0,0,0,0.5);
  opacity: 0.5;
  bottom: 0px;
  .__textfield{
    width: 100%;
  }
}

</style>