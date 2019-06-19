<template>
  <div class="chat-view">
      <v-btn class="logout-btn" flat fab right top @click="logout()" v-if="editImage==false">
        <v-icon color="black">logout</v-icon>
      </v-btn> 
      <div class="picture-input" v-if="editImage==true">
        <picture-input
          ref="pictureInput"
          @change="onChanged"
          @remove="onRemoved"
          :width="300"
          :removable="false"
          :height="300"
          accept="image/jpeg, image/png, image/gif"
          buttonClass="ui button primary"
          hideChangeButton
          crop= "true"
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
    <div flat class="header" v-if="showHeader">
      <v-avatar :size=80 class="header__avatar" v-if="editImage==false">
        <img :src="user.picture" alt="avatar" @click="editImage = true">
      </v-avatar>
        <span class="title"> {{ (loggedInUser || { username: ''}).username }} </span>
        <span class="subheading"> {{ (loggedInUser || { status: ''}).status }} </span>
    </div>

    <v-divider></v-divider>
   
    <v-list two-line class="list" v-if="showHeader">
      <template v-for="(chat, index) in allChats">      
        <v-divider v-if="index!=0" :key="index"></v-divider>
        <v-list-tile :key="chat.chatname" avatar @click="goToChat(chat.id)">
          <v-list-tile-avatar>
            <img
            :src="(chat.picture || `${publicPath}images/no_image.jpg`)"
            alt="avatar">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title v-html="chat.chatname"></v-list-tile-title>
            <template v-if="chat.messages.length > 0">
              <v-list-tile-sub-title><strong>{{chat.messages[0].user.username}}:</strong> {{chat.messages[0].content}}</v-list-tile-sub-title>
            </template>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
    <v-btn round class="add-btn" color="primary" @click="showHeader=false" v-if="showHeader"><v-icon class="__icon">add</v-icon>Neuer Chat</v-btn>
    <v-btn round class="add-btn" color="primary" @click="showHeader=true" v-if="!showHeader">Abbrechen</v-btn>
    <v-list class="user-to-add-list" two-line>
            <template v-for="(user, index) in availableUsers">
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
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { mapState } from 'vuex';
import { Chat } from '../models/chat';
import { User } from '../models/user';
import { ChatService } from '../services/chat.service';
import { UserService } from '../services/user.service';
import { MessageService } from '../services/message.service';
import ChatSettings from './TheChatSettings.vue';
// @ts-ignore
import PictureInput from 'vue-picture-input';
import { Message } from '../models/message';
import { UserInChatService } from '../services/userInChat.service';

@Component({
  components: {
    PictureInput
  },
  computed: {
    ...mapState(['loggedInUser'])
  }
})

export default class TheChatView extends Vue {

  @Prop() private messages?: Message[];
 
  private publicPath: string = process.env.BASE_URL || '/';
  private allChats: Chat[] = [];
  private user?: User = {id: undefined, username: '', email: '', password: '', picture: '', status: '', chats: []};
  private image: string = '';
  private editImage: boolean = false;
  private showHeader: boolean = true;
  private availableUsers: User[] = [];
 
  private chat?: Chat;
  
  private mounted() {
    this.user = this.$store.state.loggedInUser;
    this.setAllChats();
  }

  private async getAllChatsForUser(userId: number) {
    try {
    const chatsToReturn = await UserService.getAllChatsForUser(1);
    return chatsToReturn;
    } catch (err) {
      console.error('Error: ', err.message);
      throw err;
    }
  }

  private async setAllChats() {
      this.allChats = await ChatService.getAllChats();
  }

  private logout(): void {
    this.$router.push('/login');
  }

  private async goToChat(chatId: number){
    this.$store.commit('setSelectedChat', chatId);
    this.$router.push('/chat/' + this.$store.state.selectedChat);
    
    if(this.$store.state.selectedChat.id !== undefined ){
      this.messages = await MessageService.getMessagesInChat(this.$store.state.selectedChat);
      this.chat = await ChatService.getChat(this.$store.state.selectedChat);
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
    if (this.image && this.user !== undefined && this.user.id !== undefined) {
      const updatedUser: User = this.user;
      updatedUser.picture = this.image;
      await UserService.updateUser(this.user.id, updatedUser);
      this.editImage = false;
    }
  }

}
</script>

<style lang="scss">
  
  .chat-view {

    .logout-btn {
      position: absolute;
      top: 0px;
      right: 0px;
    }

    .picture-input {
      margin-top: 20px;
    }

    .list {
      padding: 10px;
    }
  }
  .header {
    padding: 10px 10px 20px 10px;
    background-color: #d3d3d3;
    display: flex;
    flex-direction: column;
    align-items: center;
  
    &__avatar {
      cursor: pointer;
      margin-bottom: 20px;
    }
  }

</style>