<template>
    <v-app >
      <TheToolbar />
      <TheChat />
      <router-view />
    </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TheToolbar from '@/components/TheToolbar.vue';
import TheChat from '@/components/TheChat.vue'

@Component({
    components: { TheToolbar, TheChat }
})

export default class App extends Vue {}
</script>

