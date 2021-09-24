<template>
  <v-app id="default">
    <v-main>
      <Header />
      <!-- <div class="w-100">
        <HorizontalSidebar
          :expand-on-hover.sync="expandOnHover"
        ></HorizontalSidebar>
      </div> -->
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import Header from "./modules/Header";
// import HorizontalSidebar from "./modules/HorizontalSidebar";
export default {
  name: "DefaultLayout",
  components: {
    Header, 
    // HorizontalSidebar 
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
}
</style>
