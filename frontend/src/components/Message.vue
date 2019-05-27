<template>
  <div :class="own ? 'own' : ''">
    <div class="lbl-info">
      <span class="message-data-user" v-if="!own">{{user}} </span>
      <span id="message-data-time">{{sent}}</span>
      <span class="message-data-user" v-if="own"> {{user}}</span>
    </div>
    <div class="message-body elevation-1">
      <span>{{content}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Message extends Vue {
  @Prop() private content?: string;

  @Prop() private user?: string;

  @Prop() private sent?: string;

  @Prop() private own?: boolean;
}
</script> 

<style lang="scss">
/*
.lbl-info.own > span{
        float: right;
    }
}
*/

.message-body {
  display: inline-block;
  background-color: #86bb71;
  border-radius: 10px;
  padding: 20px;
  color: white;
  font-size: 16px;
  max-width: 90%;
  margin-top: 10px;
  margin-bottom: 10px;
}

.own {
  > .lbl-info {
    text-align: right;
  }
  > .message-body {
    background-color: #94c2ed;
    float: right;
  }
}

#message-data-time {
  color: grey;
}
.message-data-user {
  font-weight: bold;
}
</style>
    

