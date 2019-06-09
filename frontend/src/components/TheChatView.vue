<template>
  <div>
    <v-layout
        wrap
        style="height: 200px;"
    >    
    <v-toolbar flat class="transparent">
        <v-list>
            <v-list-tile avatar tag="div">
              <v-avatar
                :tile="tile"
                :size="avatarSize"
                color="grey lighten-4"
              >
                <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="avatar">
              </v-avatar>

             <v-list-tile-content class="username">
                <v-list-tile-title> {{ (loggedInUser || { username: ''}).username }} </v-list-tile-title>
              </v-list-tile-content>

          </v-list-tile>

          <v-text-field class ="search"
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-list>  
    </v-toolbar>    
    
    <v-divider></v-divider>
    
    <v-list two-line>
      <template v-for="(chats, id) in allChats">
        <v-divider v-if="id!=0" :key="id"></v-divider>
        
        <v-list-tile :key="chats">
          <v-tile-avatar
            :tile="tile"
            :size="avatarSize"
            color="grey lighten-4"
          >
            <img src="https://vuetifyjs.com/apple-touch-icon-180x180.png" alt="avatar">
          </v-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title v-html="user.chat"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>

    </v-layout>
  </div>
</template>

<style>
.search{
  box-sizing: content-box;
  width: 300px;
  padding-left: 45px;

}
.username{
  padding-left: 10px;
  font-size: 20px;
  font-family:inherit;
}
</style>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { mapState } from 'vuex';
import { Chat } from '../models/chat';
import { User } from '../models/user';
import { ChatService } from '../services/chat.service';
import { UserService } from '../services/user.service';

@Component({
  computed: {
    ...mapState(['loggedInUser'])
  }
})

export default class TheChatView extends Vue {
  private allChats: Chat[] = [];
  private user: User = {id: undefined, username: '', email: '', password: '', picture: '', status: '', chats: []};
  private chatname?: string;
  

@Prop()
private chat: Chat = {id: 0, chatname: 'Kein Name', picture: '', users: []};

private mounted() {
  this.user = this.$store.state.loggedInUser;
  this.setAllChatsForUser();
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


@Watch('allChats')
private async setAllChatsForUser() {
  if (this.user.id !== undefined) {
    this.allChats = await UserService.getAllChatsForUser(this.user.id);
  }
}


 
}
</script>
