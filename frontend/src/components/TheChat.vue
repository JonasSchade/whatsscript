<template>
  <div class="container">
    <!--chat-history-->
    <div class="chat-history">
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

    <div class="chat-message">
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
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { UserService } from '../services/user.service';
import { MessageService } from '../services/message.service';
import { User } from '../models/user';
import { Message } from '../models/message';
import MessageComponent from '@/components/Message.vue';
import moment from 'moment';
import io from 'socket.io-client';

@Component({
  components: { MessageComponent }
})
export default class Chat extends Vue {
  private messageToSend: string = '';
  private message: string = '';
  private socket = io('localhost:3000');

  private status: string = 'Kein Status';
  @Prop({ type: Object as () => User })
  private user: User = {
    id: 1,
    username: 'Defaultname',
    email: 'Leer',
    password: 'Leer',
    picture: 'Leer',
    status: 'Leer',
    chats: [1, 2]
  };
  private user2: User = {
    id: 2,
    username: 'user2',
    email: 'Leer',
    password: 'Leer',
    picture: 'Leer',
    status: 'Leer',
    chats: [1, 2]
  };
  private user1: User = {
    id: 1,
    username: 'user1',
    email: 'Leer',
    password: 'Leer',
    picture: 'Leer',
    status: 'Leer',
    chats: [1, 2]
  };

  public messages: Message[] = new Array();
  public usersInChat: User[] = new Array();

  private mounted() {
    // this.$store.state.loggedInUser = this.user;
    // this.getUsersInChat(thisChat);
    this.user = this.$store.state.loggedInUser;
    // this.user.username = this.$store.state.loggedInUser.username;
    this.usersInChat.push(this.user);
    this.usersInChat.push(this.user2);
    this.usersInChat.push(this.user1);
    this.getMessages();
    this.socket.on('MESSAGE', (data: Message) => {
      this.messages = [...this.messages, data];
      // you can also do this.messages.push(data);
    });
  }

  private async getUser(userId: number): Promise<User> {
    try {
      // this.user = await UserService.getUser(1);
      const userToReturn = await UserService.getUser(1);
      return userToReturn;
    } catch (err) {
      console.error('Error: ', err.message);
      throw err;
    }
  }

  private async getMessages() {
    try {
      this.messages = await MessageService.getMessagesInChat(1);
      console.log("Nachrichten" + this.messages)

      console.log(this.messages);
    } catch (err) {
      console.log('Error: ', err.message);
    }
  }

  private deleteUser() {
    UserService.deleteUser(1);
  }

  private updateUser() {
    // UserService.updateUser(1, this.user3);
    // console.log(this.user3);
  }

  private addUser() {
    UserService.addUser(this.user2);
  }

  private sendMessageToDatabase() {
    const sent: string = moment().format('YYYY-MM-DD h:mm A');
    MessageService.addMessage({
      content: this.messageToSend,
      sent,
      read: false,
      chatId: 1,
      userId: 1
    });
  }

  private sendMsg() {
    if (this.messageToSend !== '') {
      const sent: string = moment().format('hh:mm, DD.MM.YY');
      this.socket.emit('SEND_MESSAGE', {
        content: this.messageToSend,
        sent,
        read: false,
        chatId: 1,
        userId: this.user.id
      });
      console.log("UUuuuuuserID" + this.user.id);
      this.messageToSend = '';
    }
  }

  private isItMyMessage(userid: number): boolean {
    console.log('this.$store.state.loggedInUser.id: ' + this.$store.state.loggedInUser.id);
    return this.$store.state.loggedInUser.id === userid;
  }

  private getUsername(userId: number): string {
    const userWithId = this.usersInChat.find(user => user.id === userId);
    if (userWithId !== undefined) {
      return userWithId.username;
    }
    return '';
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
</style>