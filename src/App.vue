<template>
  <v-app id="materialpro" :class="`${!$vuetify.breakpoint.smAndDown ? 'full-sidebar' : 'mini-sidebar'}`">
    <router-view />
    <notifications :duration="5000"/>
  </v-app>

</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'App',

  async created() {
  }

};
</script>

<style lang="scss">
@import "style";

</style>
