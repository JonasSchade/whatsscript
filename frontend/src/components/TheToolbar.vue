<template>
 <v-toolbar dark color="primary">
    <v-toolbar-side-icon></v-toolbar-side-icon>

    <v-toolbar-title class="chat-with">Chat with XX XX</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>more_vert</v-icon>
    </v-btn>

  </v-toolbar>
</template>

<style lang="scss">
  .chat-with {
    font-weight: bold;
    font-size: 16px;
  }

</style>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Toolbar extends Vue {}
</script> 