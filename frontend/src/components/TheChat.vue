<template>
  <div class="container">
    <!--chat-history-->
    <div class="chat-history">
      <message-component
        :user="user.username"
        sent="12:00, Today"
        :own="false"
        content="Hallo Mensch, hier ist ein anderer Mensch dkfksdfsdf djksfb jsdfs dkfksdbf k sdjnfjksd  sdjfn sdlf nsdf lssdf sdfl sf sdf fs sdf sdf sdf "
      ></message-component>
      <message-component
        :user="user.username"
        sent="12:00, Today"
        :own="true"
        content="Hallo Mensch, hier ist ein anderer Mensch dkfksdfsdf djksfb jsdfs dkfksdbf k sdjnfjksd  sdjfn sdlf nsdf lssdf sdfl sf sdf fs sdf sdf sdf "
      ></message-component>
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
      <v-btn class="black" fab="true" round="true" @click="sendMsg()">
        <v-icon color="#45efbf">send</v-icon>
      </v-btn>
    </div>
    <button @click="addUser()">Add User</button>
    <button @click="updateUser()">Update User</button>
    <button @click="deleteUser()">Delete User</button>
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
    username: 'Franz',
    email: 'franz.com',
    password: 'a',
    picture: 'b',
    status: 'naja',
    chats: [1, 2]
  };
  private user3: User = {
    id: 3,
    username: 'user3',
    email: 'user3',
    password: 'user3',
    picture: 'user3',
    status: 'user3',
    chats: [2, 3]
  };

  public messages: Message[] = new Array();
  public usersInChat: User[] = new Array();

  private mounted() {
    this.$store.state.loggedInUser = this.user;
    // this.getUsersInChat(thisChat);
    // this.getMessages();
    this.usersInChat.push(this.user);
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
      console.log('Error: ', err.message);
    }
  }

  private async getMessages() {
    try {
      this.messages = await MessageService.getMessagesInChat(1);

      console.log(this.messages);
    } catch (err) {
      console.log('Error: ', err.message);
    }
  }

  private deleteUser() {
    UserService.deleteUser(1);
  }

  private updateUser() {
    UserService.updateUser(1, this.user3);
    console.log(this.user3);
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
        userId: 1
      });
      this.messageToSend = '';
    }
  }

  private isItMyMessage(userid: number): boolean {
    return this.user.id === userid;
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