<template>
  <v-app id="default">
    <v-main>
      <Header />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import Header from "./modules/Header";
export default {
  name: "DefaultLayout",
  components: {
    Header, 
  },
  data: () => ({
    expandOnHover: false,
  }),
  async created() {},
};
</script>

<style lang="scss" scoped>
.v-main {
  max-width: 100vw;
  margin: 0;
  background-color: white;
}
</style>
