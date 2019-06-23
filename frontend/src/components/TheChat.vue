<template>
  <div class="container" :key="this.$route.path">
    <!--chat-history-->
    <div class="chat-history" v-if="this.chat.id !== null">
      <message-component
        v-for="m in messages"
        :key="m.id"
        :user="getUsername(m.userId)"
        :sent="m.sent"
        :own="isItMyMessage(m.userId)"
        :content="m.content"
      ></message-component>
    </div>
    <!--end of chat history-->

    <div class="chat-message" v-if="this.chat.id !== null">
      <textarea
        v-model="messageToSend"
        name="message-to-send"
        id="message-to-send"
        placeholder="Gib deine Nachricht ein"
        rows="3"
      ></textarea>
      <v-btn icon large @click="sendMsg()">
        <v-icon color="black" medium>send</v-icon>
      </v-btn>
    </div>
    <v-navigation-drawer
      class="chat-settings"
      v-model="$store.state.rightDrawerActive"
      app
      right
      temporary
      width="400"
    >
      <chat-settings-component :chat="chat"></chat-settings-component>
    </v-navigation-drawer>
    
  <v-navigation-drawer
      class="chat-view"
      v-model="$store.state.leftDrawerActive"
      app
      left
      temporary
      width="400"
    >
      <chat-view-component :messages="messages"></chat-view-component>
  </v-navigation-drawer>
  
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
import ChatSettingsComponent from '@/components/TheChatSettings.vue';
import ChatViewComponent from '@/components/TheChatView.vue';
import moment from 'moment';
import io from 'socket.io-client';
import { ChatService } from '../services/chat.service';

@Component({
  components: { MessageComponent, ChatSettingsComponent, ChatViewComponent }
})
export default class TheChat extends Vue {
  @Prop() private chatId?: number;

  private messageToSend: string = '';
  private message: string = '';
  private socket = io('localhost:3000');

  private status: string = 'Kein Status';
  @Prop()
  private user: User = {
    id: 1,
    username: 'Defaultname',
    email: 'Leer',
    password: 'Leer',
    picture: 'Leer',
    status: 'Leer',
    chats: [1, 2]
  };
  

  private chat: Chat = {chatname: '', picture: '', users: [], messages: []};
  public messages: Message[] = new Array();
  public usersInChat: User[] = new Array();

  private mounted() {

    this.user = this.$store.state.loggedInUser;
    this.setChat(this.$store.state.selectedChat);
    this.setUsersInChat();
    this.getMessages();
    this.socket.on('MESSAGE', (data: Message) => {
      this.messages = [...this.messages, data];
      // you can also do this.messages.push(data);
      this.scrollToBottom();
    });

  }

  private async getUser(userId: number): Promise<User> {
    try {
      // this.user = await UserService.getUser(1);
      const userToReturn = await UserService.getUser(userId);
      return userToReturn;
    } catch (err) {
      console.error('Error: ', err.message);
      throw err;
    }
  }

  @Watch('chatId')
  private async setChat(chatId: number) {
    this.chat = await ChatService.getChat(chatId);
  }

  @Watch('chat')
  private async getMessages() {
    try {
      if (this.chat !== undefined && this.chat.id !== undefined) {
        this.messages = await MessageService.getMessagesInChat(this.chat.id);
      }
    } catch (err) {
      console.log('Error: ', err.message);
    }
  }

  private sendMsg() {
    if (this.messageToSend !== '') {
      console.log('this.user: ' + this.user);
      const sent: string = moment().format('hh:mm, DD.MM.YY');
      this.socket.emit('SEND_MESSAGE', {
        content: this.messageToSend,
        sent,
        read: true,
        chatId: this.chat.id,
        userId: this.user.id
      });
      this.messageToSend = '';
    }
  }

  private isItMyMessage(userid: number): boolean {
    return this.$store.state.loggedInUser.id === userid;
  }

  private getUsername(userId: number): string {
    let userWithId;
    if (this.usersInChat.length > 0) {
      userWithId = this.usersInChat.find(user => user.id === userId);
    }
    
    if (userWithId !== undefined) {
      return userWithId.username;
    }
    return '';
  }
  
  @Watch('chat')
  private async setUsersInChat() {
    if (this.chat !== undefined && this.chat.id !== undefined) {
      this.usersInChat = await ChatService.getUsersInChat(this.chat.id!);
    }
  }

  @Watch('user')
  private updateUser() {
    this.user = this.$store.state.loggedInUser;
  }

  private updated() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    window.scrollTo(0, document.body.scrollHeight);
  }
}
</script>

<style lang="scss">
$green: #86bb71;
$blue: #94c2ed;
$gray: #92959e;

.container {
  margin-right: auto;
  margin-left: auto;
}

ul {
  list-style: none;
}

.chat-history {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  padding-top: 60px;
}
.message {
  color: white;
  padding: 18px 20px;
  line-height: 26px;
  font-size: 16px;
  border-radius: 7px;
  margin-bottom: 30px;
  width: 90%;
  position: relative;
}

.align-right {
  text-align: right;
}

.float-right {
  float: right;
}

.chat-message {
  width: 100%;
  margin-top: 30px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  border: 1px solid grey;

  textarea {
    width: 100%;
    border: none;
    padding: 10px 20px;
    font: 14px/22px "Lato", Arial, sans-serif;
    margin-bottom: 10px;
    resize: none;
  }

  // To Remove Blue Border when clicking inside textarea
  input:focus,
  textarea {
    outline: none !important;
  }

  button {
    float: right;
    font-size: 16px;
    text-transform: uppercase;
    font-weight: bold;
    margin-right: 30px;
  }
}
.other-message {
  background: $green;
}

.my-message {
  background: $blue;
}

.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}

.chat-settings{
  margin-top: 20px;
}

</style>