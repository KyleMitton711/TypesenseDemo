<template>
  <v-app-bar app clipped-left clipped-right color="white" hide-on-scroll>
    <div @click="showhideLogo">
      <v-app-bar-nav-icon @click="setSidebarDrawer(!Sidebar_drawer)" />
    </div>
    <v-menu
      open-on-hover
      :close-on-click="false"
      :close-on-content-click="false"
      :close-delay="500"
      absolute
      content-class="filter-menu elevation-0"
      bottom
      v-model="filterMenu"
      :rounded="false"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn text v-bind="attrs" v-on="on"> Filters </v-btn>
      </template>

      <v-card class="filter-content px-5" height="300px">
        <v-tabs v-model="filterTab" background-color="transparent">
          <v-tab>Manufacturer</v-tab>
          <v-tab>Category</v-tab>
          <v-tab>Location</v-tab>
        </v-tabs>

        <ais-instant-search index-name="items" :search-client="searchClient">
          <v-tabs-items v-model="filterTab">
            <v-tab-item>
              <v-card flat>
                <ais-current-refinements :transform-items="transformItems" />
                <ais-index index-name="items">
                  <ais-refinement-list attribute="manufacturer" searchable>
                    <template
                      v-slot="{
                        items,
                        isFromSearch,
                        refine,
                        createURL,
                        searchForItems,
                      }"
                    >
                      <div class="ais-RefinementList-searchBox">
                        <input
                          @input="searchForItems($event.currentTarget.value)"
                        />
                      </div>
                      <ul class="ais-RefinementList-list">
                        <li v-if="isFromSearch && !items.length">
                          No results.
                        </li>
                        <li class="ais-RefinementList-item" v-for="item in items" :key="item.value">
                          <a
                            :href="createURL(item)"
                            :style="{
                              fontWeight: item.isRefined ? 'bold' : '',
                            }"
                            class="black--text"
                            @click.prevent="filter(refine, item.value)"
                          >
                            <ais-highlight attribute="item" :hit="item" />
                          </a>
                        </li>
                      </ul>
                      <!-- <button
                        @click="toggleShowMore"
                        :disabled="!canToggleShowMore"
                      >
                        {{ !isShowingMore ? "Show more" : "Show less" }}
                      </button> -->
                    </template>
                  </ais-refinement-list>
                </ais-index>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text>123123</v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </ais-instant-search>
      </v-card>
    </v-menu>
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
import searchMixin from "@/mixins/searchMixin";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
export default {
  name: "Header",

  mixins: [searchMixin],

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
          click: this.logout,
        },
      ],
      href() {
        return undefined;
      },
      filterTab: null,
      manufacturerFilters: [],
      filterMenu: false,
    };
  },

  computed: {
    ...mapState(["navbarColor", "Sidebar_drawer", "searchDialog"]),
    ...mapGetters(["showMainFilterMenu"]),
    searchModal: {
      get() {
        return this.searchDialog;
      },
      set(val) {
        this.toggleSearchModal(val);
      },
    },
    mainFilterMenu: {
      get() {
        return this.showMainFilterMenu;
      },
      set(val) {
        this.toggleMainFilterMenu(val);
      },
    },
  },

  methods: {
    ...mapMutations({
      setSidebarDrawer: "SET_SIDEBAR_DRAWER",
    }),
    ...mapActions(["toggleSearchModal", "toggleMainFilterMenu"]),
    showhideLogo: function () {
      this.showLogo = !this.showLogo;
    },
    searchbox: function () {
      this.showSearch = !this.showSearch;
    },
    logout: function () {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      window.location.href = "/admin/auth";
    },
    transformItems(items) {
      if (items.length > 0) {
        this.manufacturerFilters = [...items[0].refinements];
        this.manufacturerFilters = this.manufacturerFilters.map((item) => ({
          attribute: item.attribute,
          value: item.value,
        }));
        delete this.manufacturerFilters["__ob__"];
      } else {
        this.manufacturerFilters = [];
      }
      return items;
    },
    filter(action, val) {
      document.getElementsByClassName('ais-CurrentRefinements-delete').forEach(item => {
        item.click();
      });
      action(val);
      this.filterMenu = false;
    }
  },

  watch: {
    manufacturerFilters: {
      handler: function (val) {
        console.log(val);
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
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

.filter-content {
  width: 100vw;
  // position: absolute;
  left: 0;
  z-index: 5;
  border-radius: 0 !important;
}

.filter-menu {
  top: 64px !important;
  left: 0 !important;
  max-width: 100vw !important;
  border-radius: 0 !important;
}

::v-deep .ais-CurrentRefinements {
  .ais-CurrentRefinements-list {
    height: 0;
    overflow: hidden;
  }
}

::v-deep .ais-RefinementList {
  position: relative;
  padding-bottom: 50px;
  min-height: 230px;

  .ais-RefinementList-list {
    display: flex;
    flex-wrap: wrap;
    .ais-RefinementList-item {
      width: 33%;
      color: black;
      // max-width: 300px;
      padding-left: 20px;
      padding-right: 20px;
      @media (max-width: 600px) {
        width: 100%;
      }

      .ais-RefinementList-labelText {
        white-space: unset;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .ais-RefinementList-count {
        display: none;
      }
    }
  }
  .ais-RefinementList-searchBox {
    position: absolute;
    bottom: 0px;
    border: 1px solid black;
    padding: 10px;
    width: 80%;

    form {
      width: 100%;

      input {
        width: calc(100% - 35px);
      }
    }

    input:focus-visible {
      outline: none;
    }
  }
}
</style>