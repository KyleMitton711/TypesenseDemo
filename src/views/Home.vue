<template>
  <v-container class="fill-height justify-center" tag="section">
    <v-row justify="center">
      <v-col lg="11" md="11" sm="8" xl="7">
        <v-card class="elevation-0 px-4">
          <v-row>
            <v-col cols="12" class="pa-5">
              <h1 class="text-center">> Software</h1>
              <p class="text-center">
                Stream software videos to your desktop, laptop, tablet, phone
                and smart TV.
              </p>
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
                        @change="onSelect"
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

              <p class="pt-4 pb-0">
                <a class="black--text" @click="learnMoreDialog = true">
                  Learn More
                </a>
                &nbsp; | &nbsp;
                <a class="black--text" @click="forVendorsDialog = true">
                  For Vendors
                </a>
              </p>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="learnMoreDialog" width="500">
      <v-card height="400px"> </v-card>
    </v-dialog>
    <v-dialog v-model="forVendorsDialog" width="500">
      <v-card height="400px"> </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import debounce from "debounce";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import searchMixin from "@/mixins/searchMixin";

export default {
  name: "Home",
  mixins: [searchMixin],
  data() {
    return {
      searchKeyword: "",
      learnMoreDialog: false,
      forVendorsDialog: false,
    };
  },
  computed: {
    ...mapGetters(["searchDialog", "viewMode", "customQuery"]),
    ...mapState(["Sidebar_drawer"]),
    searchModal: {
      get() {
        return this.searchDialog;
      },
      set(val) {
        this.toggleSearchModal(val);
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
    ...mapActions(["toggleSearchModal", "toggleViewMode", "setQuery"]),
    ...mapMutations({
      setSidebarDrawer: "SET_SIDEBAR_DRAWER",
    }),

    onSelect(selected) {
      this.page = 0;
      window.scrollTo(0, 0);
      if (selected) {
        setTimeout(() => {
          this.query = selected;
          this.$router.push({ name: "Search" });
          this.toggleSearchModal(false);
        }, 400);
      }
    },

    startSearch: debounce(function (refine) {
      refine();
      if (this.searchModal && !this.searchKeyword) {
        this.query = "";
      }
    }, 500)
  }
};
</script>

<style lang="scss">
.ais-RefinementList-list,
.ais-NumericMenu-list {
  list-style: none;
  padding-left: 0 !important;
  margin-top: 10px;
}

.ais-RefinementList-list .ais-RefinementList-item,
.ais-NumericMenu-list .ais-NumericMenu-item {
  padding: 6px 0;
}

.ais-RefinementList-labelText,
.ais-NumericMenu-labelText {
  margin-left: 8px;
  font-size: 16px;
}

.ais-RefinementList-label {
  display: flex;
  align-items: flex-start;
}

.ais-RefinementList-count {
  padding: 2px 12px;
  background: #eceff1;
  color: #121212 !important;
  border-radius: 12px;
  font-weight: 600;
  margin-left: auto;
}

.p-15 {
  padding: 15px !important;
}

.hits-list {
  padding-left: 0 !important;
  list-style: none;
  margin: 0 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.hit-price {
  background: #bbdefb;
  display: inline-block;
  padding: 4px 9px;
  border-radius: 23px;
  line-height: normal;
  font-size: 15px;
}

/* @media (min-width: 1600px) { */
li.ais-Hits-item {
  width: 50%;
  float: left;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}

.thumbnail-image {
  max-width: 260px !important;
  min-width: 260px !important;
  width: 260px !important;
}
/* } */

@media (min-width: 1900px) {
  li.ais-Hits-item {
    width: 33.33%;
    float: left;
  }
}

.product-list {
  padding-left: 0;
  &.sidebar-show {
    padding-left: 235px;
  }
  @media (max-width: 960px) {
    padding-left: 0 !important;
  }
}
</style>
