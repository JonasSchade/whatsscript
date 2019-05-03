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
            <div class="message other-message float-right">
              Hi Vincent, how are you? How is the project coming along?
            </div>
          </li>
          
          <li>
            <div class="message-data">
              <span class="message-data-name"><i class="fa fa-circle online"></i> Vincent</span>
              <span class="message-data-time">10:12 AM, Today</span>
            </div>
            <div class="message my-message">
              Are we meeting today? Project has been already finished and I have results to show you.
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
    $orange: #E38968;
    $gray: #92959E;
    .container{
        margin-right: auto; 
        margin-left: auto;
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
    .my-message {
      background: $green;
    }
    
    .other-message {
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
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Chat extends Vue {
    data(){}
}


</script>