<template>
  <v-toolbar class="toolbar" dark color="primary">
    <v-btn icon @click.stop="showChatView()">
      <v-icon large>menu</v-icon>
    </v-btn>

    <v-toolbar-title class="title"> Welcome to Whatscript! {{ (loggedInUser || { username: ''}).username }}</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon @click.stop="showChartSettings()">
      <v-icon large>info</v-icon>
    </v-btn>

  </v-toolbar>
  
</template>

<style lang="scss">
  .toolbar {
    position: fixed;
  }
</style>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';

@Component({
  computed: {
    ...mapState(['loggedInUser'])
  }
})
export default class Toolbar extends Vue {

  private showChartSettings(): void {
    this.$store.commit('changeDrawer');
  }

  private showChatView(): void {
    this.$store.commit('changeDrawerLeft');
  }
}
</script> 