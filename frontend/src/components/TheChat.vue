<template>
    <div class="container">
        <form class="chat-area">   
            <div class="chat-area--messages">
                <p id="text">
                    Messages {{ info }}
                </p>
            </div>

            <v-textarea class="chat-area--text" placeholder="Write a message..."></v-textarea>
            <v-btn color="info">Send</v-btn>   

        </form>
    </div>
</template>

<style lang="scss">
    #text{
        padding: 0px;
        height: 250px;
        display: flex;
        justify-content: center;
        align-items: center;
        
    }
    .container{
        margin-right: auto; 
        margin-left: auto;
    }
    .chat-area--text{
        background: rgb(255, 255, 255); 
        color: rgb(34, 34, 34);
        margin-left: 5px;
        margin-right: 5px;
        margin-bottom: 100px;
        padding: 0px;
    }
    .chat-area--button{ 
        
    }
    .chat-area--messages{
        padding: 0px;
    }
</style>


<script lang="ts">
import { Component, Vue, Prop  } from 'vue-property-decorator';
import { UserService } from '../services/user.service'
import { User } from '../models/user'

@Component
export default class Chat extends Vue {
    
    private info: string = 'hey';
    @Prop({type: Object as () => User})
    private user: User;

    mounted () {
        this.getUser();
        this.info =  this.user.username;
    }

    async getUser() {
   
    try {
        this.user = await UserService.getUser(1);
        console.log(this.user);
    }
    catch(err) {
        console.log('Error: ', err.message);
    }
  }

}
</script>