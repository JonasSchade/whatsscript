<template>
    <v-app >
      <TheToolbar />
      <TheLogin />
      <router-view />
    </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TheToolbar from '@/components/TheToolbar.vue';
import TheChat from '@/components/TheChat.vue';
import TheLogin from '@/components/TheLogin.vue';

@Component({
    components: { TheToolbar, TheChat, TheLogin }
})

export default class App extends Vue {}
</script>

