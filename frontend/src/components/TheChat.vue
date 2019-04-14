<template>

    <form class="chat-area">
        
        <div class="chat-area--messages">
            <p id="text">
                Test the chat window by sending a message:
            </p>
        
        </div>

        <textarea placeholder="Write a test message...." class="chat-area--text" >
        </textarea> 
        
        <button class="chat-area--button"> 
                Send Message! 
        </button>

    </form>

</template>

<style lang="scss">

#text{
    margin-left: 50px;
    margin-right: 50px;
    margin-bottom: 250px;
    padding: 0px;
    text-align: center;
    width: 500px;
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
    background: rgb(78, 140, 255); 
    color: rgb(255, 255, 255);
}
.chat-area--messages{
    padding-left: 5px;
    padding-right: 5px;
    padding-bottom: 5px;
}

</style>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Chat extends Vue {
    data(){}
}
</script>