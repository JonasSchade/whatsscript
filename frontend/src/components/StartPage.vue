<template>
  <div class="container">
      <h1>Willkommen bei Whatsscript! Klicke links oben auf das Menü um einen neuen Chat zu starten!</h1>
      <v-navigation-drawer
      class="chat-view"
      v-model="$store.state.leftDrawerActive"
      absolute
      left
      temporary
      width="400"
    >
      <chat-view-component></chat-view-component>
  </v-navigation-drawer>
  </div>
  
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ChatViewComponent from '@/components/TheChatView.vue';

@Component({
  components: { ChatViewComponent }
})
export default class StartPage extends Vue {

}
</script>

<style lang="scss">
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

</style>