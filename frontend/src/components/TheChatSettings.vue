<template>
  <div class="container">
    <div v-if="editImage==true">
      <picture-input
        ref="pictureInput"
        @change="onChanged"
        @remove="onRemoved"
        :width="400"
        :removable="false"
        :height="400"
        accept="image/jpeg, image/png, image/gif"
        buttonClass="ui button primary"
        hideChangeButton
        crop: true
        :customStrings="{
        upload: '<h1>Upload!</h1>',
        drag: 'Klicke oder ziehe ein Foto hier her!'}">
      </picture-input>
      <div class="--center-content">
        <v-btn round class="add-btn" color="primary" @click="attemptUpload" v-bind:class="{ disabled: image=='' }">
          <v-icon class="__icon">check</v-icon>Upload
        </v-btn>
        <v-btn dark round class="add-btn" color="red" @click="editImage = false">
          <v-icon color="white" class="__icon">cancel</v-icon>Abbrechen
        </v-btn>
      </div>
    </div>
    <div v-if="editImage==false">
      <v-img class="image" :aspect-ratio="16/9" :src="chat.picture" :lazy-src="`${publicPath}images/no_image.jpg`">
        <v-btn class="__add-image-btn" flat fab @click="editImage = true">
            <v-icon color="black">photo</v-icon>
        </v-btn>
        <div class="chatname-wrapper">
          <v-text-field
          single-line
          label="Chatname" 
          v-model="chat.chatname"
          placeholder="Gib dem Chat einen Namen!"
          dark
          class="__textfield"
          @click="showSaveIcon = true">
          </v-text-field>
          <v-btn flat fab @click="saveNewChatname()" v-if="showSaveIcon">
            <v-icon color= "white">check</v-icon>
          </v-btn>
        </div>
      </v-img>
    </div>
      <div class="user-wrapper">
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
import PictureInput from 'vue-picture-input';

@Component({
  components: { MessageComponent, PictureInput }
})
export default class ChatSettings extends Vue {
  private publicPath: string = process.env.BASE_URL || '/';
  private status: string = 'Kein Status';
  private user?: User;
  private usersInChat: User[] = [];
  private usersNotInChat: User[] = [];
  private userToAddVisible: boolean = false;
  private image: string = '';
  private editImage: boolean = false;
  private showSaveIcon: boolean = false;

  @Prop()
  private chat: Chat = {id: undefined, chatname: '', picture: '', users: []};

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

  private onChanged(image: string) {
    if (image) {
      this.image = image;
    } else {
      console.log('Your browser is too old. No support for Filereader API');
    }
  }

  private onRemoved() {
    this.image = '';
  }

  private async attemptUpload() {
    if (this.image && this.chat.id !== undefined) {
      const updatedChat: Chat = this.chat;
      updatedChat.picture = this.image;
      await ChatService.updateChat(this.chat.id, updatedChat);
      this.editImage = false;
    }
  }

  private async saveNewChatname() {
    if (this.chat.id !== undefined) {
      await ChatService.updateChat(this.chat.id, this.chat);
      this.showSaveIcon = false;
    }
  }

}
</script>

<style lang="scss">

.image {
  background-color: rgba(200,200,200,.25);
  position: relative;
  .__add-image-btn {
    position: absolute;
    top: 5px;
    right: 5px;
  }
}

.user-wrapper {
  margin-top: 40px;

  .user-to-add-wrapper {
  margin-top: 30px;
  }
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
  bottom: 0px;
  display: inline-flex;
  width: 100%;
  .__textfield{
    margin: 0px 0px 0px 10px;
  }
}

</style>