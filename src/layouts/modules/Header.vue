<template>
  <v-app-bar
    app
    clipped-left
    clipped-right
    color="white"
  >
    <div @click="showhideLogo">
      <v-app-bar-nav-icon
        @click="
          setSidebarDrawer(!Sidebar_drawer)
        "
      />
    </div>
    <v-spacer />
    <!---right part -->
    <!---User -->
    <v-btn fab icon @click="searchModal = true">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-btn fab icon>
      <v-icon>mdi-pencil</v-icon>
    </v-btn>
    <!---User -->
  </v-app-bar>
</template>
<script>
// Utilities
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "Header",

  components: {},

  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showLogo: true,
      showSearch: false,
      userprofile: [
        { title: "Inbox", to: "/theme/apps/email/inbox" },
        { title: "Account Setting", to: "/theme/form-layouts/flformbasic" },
        { 
          title: "Logout", 
          click: this.logout
        },
      ],
      href() {
        return undefined;
      },
    }
  },

  computed: {
    ...mapState(["navbarColor", "Sidebar_drawer", "searchDialog"]),
    searchModal: {
      get() {
        return this.searchDialog;
      },
      set(val) {
        this.toggleSearchModal(val);
      }
    }
  },

  methods: {
    ...mapMutations({
      setSidebarDrawer: "SET_SIDEBAR_DRAWER",
    }),
    ...mapActions(["toggleSearchModal"]),
    showhideLogo: function () {
      this.showLogo = !this.showLogo;
    },
    searchbox: function () {
      this.showSearch = !this.showSearch;
    },
    logout: function () {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      window.location.href = "/admin/auth";
    }
  },
};
</script>

<style lang="scss">
.hidelogo {
  display: none;
}
.searchinput {
  position: absolute;
  width: 100%;
  margin: 0;
  left: 0;
  z-index: 10;
  padding: 0 15px;
}
.descpart {
  max-width: 220px;
}
</style>