<template>
  <v-app id="default">
    <v-main>
      <Header />
      <router-view />
      <Footer></Footer> 
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import Header from "./modules/Header";
import Footer from './modules/Footer';
export default {
  name: "DefaultLayout",
  components: {
    Header, 
    Footer
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
