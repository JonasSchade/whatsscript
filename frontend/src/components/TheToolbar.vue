<template>
    <v-toolbar color="primary">
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title>Title</v-toolbar-title>
    </v-toolbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Toolbar extends Vue {}
</script>