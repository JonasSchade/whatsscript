<template>
 <v-toolbar class="toolbar" dark color="primary">

    <v-toolbar-side-icon></v-toolbar-side-icon>
   
    <v-toolbar-title class="title"> Welcome to Whatscript! {{ (loggedInUser || { username: ''}).username }}</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>more_vert</v-icon>
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
}
</script> 