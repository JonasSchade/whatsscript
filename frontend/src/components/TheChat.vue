<template>
    <div class="container">

        <!--chat-history-->  
      <div class="chat-history">
            <message :user="user.username" sent="12:00, Today" :own="true" content="Hallo Mensch, hier ist ein anderer Mensch dkfksdfsdf djksfb jsdfs dkfksdbf k sdjnfjksd  sdjfn sdlf nsdf lssdf sdfl sf sdf fs sdf sdf sdf "></message>
            <message :user="user.username" sent="12:00, Today" :own="false" content="Hallo Mensch, hier ist ein anderer Mensch dkfksdfsdf djksfb jsdfs dkfksdbf k sdjnfjksd  sdjfn sdlf nsdf lssdf sdfl sf sdf fs sdf sdf sdf "></message>
            <message :user="user.username" sent="12:00, Today" :own="true" content="Hallo Mensch, hier ist ein anderer Mensch dkfksdfsdf djksfb jsdfs dkfksdbf k sdjnfjksd  sdjfn sdlf nsdf lssdf sdfl sf sdf fs sdf sdf sdf "></message>
            <message :user="user.username" sent="12:00, Today" :own="false" content="Hallo Mensch, hier ist ein anderer Mensch dkfksdfsdf djksfb jsdfs dkfksdbf k sdjnfjksd  sdjfn sdlf nsdf lssdf sdfl sf sdf fs sdf sdf sdf "></message>

      </div>
        <!--end of chat history-->
        
        
        <div class="chat-message">
            <textarea name="message-to-send" id="message-to-send" placeholder ="Type your message" rows="3"></textarea>
            <button>Send</button>
        </div> 
        <button @click="addUser()">Add User</button>
        <button @click="updateUser()">Update User</button>
        <button @click="deleteUser()">Delete User</button>
    </div>
</template>

<style lang="scss">
    $green: #86BB71;
    $blue: #94C2ED;
    $gray: #92959E;

    .container{
        margin-right: auto; 
        margin-left: auto;
    }

    ul{
      list-style: none;
    }

    .chat-history {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: auto;

      /*
    padding: 30px 30px 20px;
    border-bottom: 2px solid white;
    overflow-y: scroll;
    height: 575px;
    
        .message-data {
        margin-bottom: 15px;
        }
        
        .message-data-time {
        color: lighten($gray, 8%);
        padding-left: 6px;
        }
        */
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
    padding: 30px;
    
        textarea {
        width: 100%;
        border: none;
        padding: 10px 20px;
        font: 14px/22px "Lato", Arial, sans-serif;
        margin-bottom: 10px;
        border-radius: 5px;
        resize: none;

        }
    
        button {
        float: right;
        color: #1E90FF;
        font-size: 16px;
        text-transform: uppercase;
        border: none;
        cursor: pointer;
        font-weight: bold;
        background: #F2F5F8;
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


<script lang="ts">
import { Component, Vue, Prop  } from 'vue-property-decorator';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import Message from '@/components/Message.vue';

@Component({
  components: { Message }
})
export default class Chat extends Vue {
    
   
    private status: string = 'Kein Status';
    @Prop({type: Object as () => User})
    private user: User = {
            username: 'Leer',
            email: 'Leer',
            password: 'Leer',
            picture: 'Leer',
            status: 'Leer',
            chats: [{chatname: 'Leer', picture: 'Leer', users: []}]
        };
        private user2: User = {
            username: 'Franz',
            email: 'franz.com',
            password: 'a',
            picture: 'b',
            status: 'naja',
            chats: [{chatname: 'Leer', picture: 'Leer', users: []}]
        };
         private user3: User = {
            username: 'user3',
            email: 'user3',
            password: 'user3',
            picture: 'user3',
            status: 'user3',
            chats: [{chatname: 'Leer', picture: 'Leer', users: []}]
        };

    private mounted() {
        this.getUser();
       // UserService.addUser(this.user2);
    }

    private async getUser() {
   
    try {
        this.user = await UserService.getUser(1);
      
        this.status = this.user.status;
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

}


</script>