<template>
    <v-app >
      <the-toolbar />
      <router-view />
    </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TheToolbar from '@/components/TheToolbar.vue';

@Component({
    components: { TheToolbar }
})
export default class App extends Vue {}
</script>

