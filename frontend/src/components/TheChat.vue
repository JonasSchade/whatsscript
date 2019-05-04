<template>
    <div class="container">

        <!--chat-history-->  
      <div class="chat-history">
        <ul>
          <li class="clearfix">
            <div class="message-data align-right">
              <span class="message-data-time" >10:10 AM, Today</span> &nbsp; &nbsp;
              <span class="message-data-name" >Olia</span> <i class="fa fa-circle me"></i>
              
            </div>
            <div class="message my-message float-right">
              Hi Vincent, how are you? How is the project coming along?
            </div>
          </li>
          
          <li>
            <div class="message-data">
              <span class="message-data-name"><i class="fa fa-circle online"></i> Vincent{{user.username}}</span>
              <span class="message-data-time">10:12 AM, Today</span>
            </div>
            <div class="message other-message">
              Are we meeting today? Project has been already finished and I have results to show you.{{user.status}}
            </div>
          </li>
        </ul>
      </div>
        <!--end of chat history-->
        
        
        <div class="chat-message">
            <textarea name="message-to-send" id="message-to-send" placeholder ="Type your message" rows="3"></textarea>
            <button>Send</button>
        </div> 

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
import { UserService } from '../services/user.service'
import { User } from '../models/user'

@Component
export default class Chat extends Vue {
    
    private username: string = 'hey';
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

    mounted () {
        this.getUser();
    }

    private async getUser() {
   
    try {
        this.user = await UserService.getUser(1);
        this.username = this.user.username;
        this.status = this.user.status;
        console.log(this.user);
    }
    catch (err) {
        console.log('Error: ', err.message);
    }
  }

}


</script>