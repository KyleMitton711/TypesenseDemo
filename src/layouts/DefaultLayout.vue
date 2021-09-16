<template>
  <v-app id="default">
    <router-view />
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'DefaultLayout',

  async created() {
  }

};
</script>

<style lang="scss" scoped>

</style>
