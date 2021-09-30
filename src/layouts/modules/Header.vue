<template>
  <v-app-bar app clipped-left clipped-right color="white" class="header-menu border-bottom" height="75" hide-on-scroll>
    <div @click="showhideLogo" class="mr-4">
      <v-app-bar-nav-icon @click="setSidebarDrawer(!Sidebar_drawer)" />
    </div>
    <a href="/" class="d-flex mr-4">
      <img src="@/assets/logo.svg" width="45px" height="50px"/>
    </a>
    <ais-instant-search
      index-name="items"
      :search-client="searchClient"
    >
      <ais-index index-name="items">
        <ais-configure :hitsPerPage="5" />
        <ais-autocomplete>
          <template slot-scope="{ indices, refine }">
            <v-combobox
              outlined
              dense
              hide-details
              :items="
                indices
                  .filter(({ indexId }) => indexId === 'items')[0]
                  .hits.map((item) => {
                    let name = item.name.toLowerCase();
                    let description = item.description.toLowerCase();
                    let keyword = searchKeyword || '';
                    var matched = [];
                    if (keyword.length > 0) {
                      matched = (name + ' ' + description)
                        .split(' ')
                        .filter(
                          (item) =>
                            item
                              .toLowerCase()
                              .indexOf(keyword.toLowerCase()) == 0
                        );
                    }
                    return matched;
                  })
                  .flat(1)
                  .sort()
                  .filter(function (item, pos, ary) {
                    return !pos || item != ary[pos - 1];
                  })
              "
              placeholder="Search here…"
              @update:search-input="startSearch(refine)"
              :search-input.sync="searchKeyword"
              v-model="query"
              clearable
              hide-selected
            >
              <template slot="append">
                <v-icon>mdi-magnify</v-icon>
              </template>
            </v-combobox>
          </template>
        </ais-autocomplete>
      </ais-index>
    </ais-instant-search>
    <!-- <v-menu
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

      <v-card class="filter-content px-5 pb-2" min-height="300px">
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
                        <v-text-field
                          @input="searchForItems(filterSearchKeyword)"
                          v-model="filterSearchKeyword"
                          clearable
                          outlined
                          hide-details
                        >
                        </v-text-field>
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
                            class="black--text ais-RefinementList-labelText"
                            @click.prevent="filter(refine, item.value)"
                          >
                            <ais-highlight attribute="item" :hit="item" />
                          </a>
                        </li>
                      </ul>
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
    </v-menu> -->
    <v-spacer />
    <!---right part -->
    <a class="black--text" @click="learnMoreDialog = true">
      Learn More
    </a>
    &nbsp; | &nbsp;
    <a class="black--text" @click="forVendorsDialog = true">
      For Vendors
    </a>
    <v-dialog v-model="learnMoreDialog" width="500">
      <v-card height="400px"> </v-card>
    </v-dialog>
    <v-dialog v-model="forVendorsDialog" width="500">
      <v-card height="400px"> </v-card>
    </v-dialog>
  </v-app-bar>
</template>
<script>
// Utilities
import debounce from "debounce";
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
      filterSearchKeyword: null,
      learnMoreDialog: false,
      forVendorsDialog: false,
      searchKeyword: null,
      isMounted: false
    };
  },

  computed: {
    ...mapState(["navbarColor", "Sidebar_drawer", "searchDialog"]),
    ...mapGetters(["showMainFilterMenu", "customQuery"]),
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
    query: {
      get() {
        return this.customQuery;
      },
      set(val) {
        this.setQuery(val);
      },
    },
  },

  methods: {
    ...mapMutations({
      setSidebarDrawer: "SET_SIDEBAR_DRAWER",
    }),
    ...mapActions(["toggleSearchModal", "toggleMainFilterMenu", "setFacetFilters", "setQuery"]),
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
    },
    startSearch: debounce(function (refine) {
      refine();
    }, 500),
  },

  watch: {
    manufacturerFilters: {
      handler: function (val) {
        console.log(val);
        this.setFacetFilters(val);
      },
      deep: true,
    },
  },

  mounted() {
    this.isMounted = true;
  }
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
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  border-top: 1px solid #AAA;
}

.header-menu {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1)!important;
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
      padding: 0 20px;
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
    // border: 1px solid black;
    padding: 10px;
    width: 100%;

    // form {
    //   width: 100%;

    //   input {
    //     width: calc(100% - 35px);
    //   }
    // }

    // input:focus-visible {
    //   outline: none;
    // }
  }
}
</style>