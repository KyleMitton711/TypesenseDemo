<template>
  <v-container fluid class="pt-0">
    <!-- <Banner v-if="showBanner" /> -->
    <v-row>
      <v-col cols="12">
        <div class="d-flex justify-end">
          <v-btn-toggle v-model="isListViewMode" mandatory>
            <v-btn>
              <v-icon>mdi-grid</v-icon>
            </v-btn>

            <v-btn>
              <v-icon>mdi-format-list-checkbox</v-icon>
            </v-btn>
          </v-btn-toggle>
        </div>
      </v-col>
      <v-col cols="12">
        <ais-instant-search index-name="items" :search-client="searchClient">
          <v-row no-gutters>
            <v-col cols="12">
              <ais-current-refinements :transform-items="transformItems" />
              <ais-index index-name="items">
                <v-row>
                  <v-col cols="12" style="position: relative">
                    <v-navigation-drawer
                      v-model="sidebarShow"
                      class="px-3"
                      overlay-opacity="0"
                      absolute
                      mini-variant-width="70"
                      mobile-breakpoint="960"
                    >
                      <h2 class="title">DATE</h2>
                      <ais-numeric-menu attribute="added" :items="dateItems">
                        <template v-slot="{ items, refine }">
                          <ul class="ais-NumericMenu-list">
                            <li
                              class="ais-NumericMenu-item"
                              :class="
                                item.isRefined
                                  ? 'ais-NumericMenu-item--selected'
                                  : ''
                              "
                              v-for="(item, index) in items.slice(0, -1)"
                              :key="index"
                            >
                              <label class="ais-NumericMenu-label">
                                <input
                                  class="ais-NumericMenu-radio"
                                  type="radio"
                                  name="NumericMenu"
                                  :value="item.value"
                                  @click.prevent="refine(item.value)"
                                  :checked="
                                    item.isRefined && !showCustomDateRangePicker
                                      ? 'checked'
                                      : ''
                                  "
                                />
                                <span class="ais-NumericMenu-labelText">
                                  {{ item.label }}
                                </span>
                              </label>
                            </li>
                            <li
                              class="ais-NumericMenu-item"
                              :class="
                                showCustomDateRangePicker
                                  ? 'ais-NumericMenu-item--selected'
                                  : ''
                              "
                              v-for="(item, index) in items.slice(
                                items.length - 1,
                                items.length
                              )"
                              :key="index + 'last'"
                            >
                              <label class="ais-NumericMenu-label">
                                <input
                                  class="ais-NumericMenu-radio"
                                  type="radio"
                                  name="NumericMenu"
                                  :value="item.value"
                                  @click.prevent="
                                    showCustomDateRangePicker = true
                                  "
                                  :checked="
                                    showCustomDateRangePicker ? 'checked' : ''
                                  "
                                />
                                <span class="ais-NumericMenu-labelText">
                                  {{ item.label }}
                                </span>
                              </label>
                            </li>
                            <v-menu
                              ref="menu"
                              v-model="menu"
                              :close-on-content-click="false"
                              :return-value.sync="dates"
                              transition="scale-transition"
                              offset-y
                              min-width="auto"
                              v-if="showCustomDateRangePicker"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  v-model="dateRangeText"
                                  placeholder="Select dates"
                                  prepend-icon="mdi-calendar"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker v-model="dates" range no-title>
                                <v-spacer></v-spacer>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="menu = false"
                                >
                                  Cancel
                                </v-btn>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="$refs.menu.save(dates)"
                                >
                                  OK
                                </v-btn>
                              </v-date-picker>
                            </v-menu>
                          </ul>
                        </template>
                      </ais-numeric-menu>
                      <h2 class="title">PRICE</h2>
                      <ais-numeric-menu
                        attribute="price"
                        :items="[
                          { label: 'All' },
                          { label: '<= 10$', end: 10 },
                          { label: '10$ - 100$', start: 10, end: 100 },
                          { label: '100$ - 500$', start: 100, end: 500 },
                          { label: '>= 500$', start: 500 },
                        ]"
                      />
                      <h2 class="title">MANUFACTURER</h2>
                      <ais-refinement-list attribute="manufacturer" />
                    </v-navigation-drawer>
                    <div
                      class="product-list"
                      :class="sidebarShow ? 'sidebar-show' : ''"
                    >
                      <ais-configure
                        :query="query"
                        :page="page"
                        :hitsPerPage="hitsPerPage"
                        :facetFilters="customFacetFilters"
                      />
                      <infinite-hits @filter-selected="hideBanner">
                        <template slot="item" slot-scope="{ item }">
                          <div
                            class="
                              pa-5
                              d-flex
                            "
                            :class="viewMode ? 'flex-wrap flex-sm-nowrap': 'flex-column align-center'"
                          >
                            <div
                              class="
                                text-center
                                d-flex
                                flex-column
                                align-center
                                thumbnail-image
                              "
                              :class="viewMode ? 'mx-auto mx-sm-0 mr-sm-4' : ''"
                            >
                              <img
                                :src="require('@/assets/placeholder-img.jpg')"
                                align="left"
                                class=""
                              />
                            </div>
                            <div class="mt-4">
                              <div class="hit-name title d-flex">
                                <ais-highlight
                                  attribute="name"
                                  :hit="item"
                                ></ais-highlight>
                              </div>

                              <div class="hit-description subtitle-2">
                                <ais-highlight
                                  attribute="description"
                                  :hit="item"
                                ></ais-highlight>
                              </div>

                              <div
                                class="
                                  hit-price
                                  info--text
                                  mt-2
                                  font-weight-medium
                                  text-truncate
                                "
                              >
                                $ {{ item.price }}
                              </div>

                              <div class="d-flex mt-4">
                                <v-btn depressed color="primary">
                                  Add to cart
                                </v-btn>
                                <v-btn icon color="red" class="ml-4">
                                  <v-icon>mdi-heart</v-icon>
                                </v-btn>
                              </div>
                            </div>
                          </div>
                        </template>
                      </infinite-hits>
                    </div>
                  </v-col>
                </v-row>
              </ais-index>
            </v-col>
          </v-row>
        </ais-instant-search>
      </v-col>
    </v-row>
    <v-dialog v-model="searchModal" width="500" permanent>
      <v-card>
        <v-card-text class="pa-0">
          <v-container>
            <v-row>
              <v-col cols="12" class="py-0">
                <ais-instant-search
                  index-name="items"
                  :search-client="searchClient"
                >
                  <ais-index index-name="items">
                    <ais-configure :hitsPerPage="5" />
                    <ais-autocomplete>
                      <template slot-scope="{ indices, refine }">
                        <v-combobox
                          dense
                          solo
                          hide-details
                          :items="
                            indices
                              .filter(({ indexId }) => indexId === 'items')[0]
                              .hits.map((item) => {
                                let name = item.name.toLowerCase();
                                let description =
                                  item.description.toLowerCase();
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
                        </v-combobox>
                      </template>
                    </ais-autocomplete>
                  </ais-index>
                </ais-instant-search>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import debounce from "debounce";
import moment from "moment";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import InfiniteHits from "@/components/InfiniteHits";
// import Banner from "@/components/Banner";
import searchMixin from "@/mixins/searchMixin";

export default {
  name: "Search",
  mixins: [searchMixin],
  components: {
    InfiniteHits,
    // Banner,
  },
  data() {
    return {
      page: 1,
      searchKeyword: "",
      hitsPerPage: 5,
      menu: false,
      dates: [],
      showCustomDateRangePicker: false,
      dateItems: [
        { label: "All" },
        {
          label: "Today",
          start: moment().startOf("day").valueOf(),
          end: moment().endOf("day").valueOf(),
        },
        {
          label: "Yesterday",
          start: moment().subtract(1, "days").startOf("day").valueOf(),
          end: moment().subtract(1, "days").endOf("day").valueOf(),
        },
        {
          label: "Last 7 Days",
          start: moment().subtract(7, "days").startOf("day").valueOf(),
          end: moment().endOf("day").valueOf(),
        },
        {
          label: "Last 30 Days",
          start: moment().subtract(30, "days").startOf("day").valueOf(),
          end: moment().endOf("day").valueOf(),
        },
        {
          label: "This Month",
          start: moment().subtract(1, "months").startOf("day").valueOf(),
          end: moment().endOf("day").valueOf(),
        },
        {
          label: "Custom Range",
          start: moment().subtract(1, "months").startOf("day").valueOf(),
          end: moment().endOf("day").valueOf(),
        },
      ],
      showBanner: true,
    };
  },
  computed: {
    ...mapGetters(["searchDialog", "viewMode", "facetFilters", "customQuery"]),
    ...mapState(["Sidebar_drawer"]),
    searchModal: {
      get() {
        return this.searchDialog;
      },
      set(val) {
        this.toggleSearchModal(val);
      },
    },
    sidebarShow: {
      get() {
        return this.Sidebar_drawer;
      },
      set(val) {
        this.setSidebarDrawer(val);
      },
    },
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
    isListViewMode: {
      get() {
        return this.viewMode ? 1 : 0;
      },
      set(val) {
        this.toggleViewMode(val == 1 ? true : false);
      },
    },
    customFacetFilters() {
      return this.facetFilters.length > 0 ? this.facetFilters.map(item => `${item.attribute}:${item.value}`) : "";
    },
    query: {
      get() {
        return this.customQuery;
      },
      set(val) {
        this.setQuery(val);
      }
    }
  },
  watch: {
    customFacetFilters: {
      handler: function(val) {
        if (val.length > 0) {
          this.hideBanner();
        }
      },
      deep: true
    },
    query(val) {
      this.page = 0;
      window.scrollTo(0, 0);
    }
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
        this.showBanner = false;
        setTimeout(() => {
          this.query = selected;
          this.toggleSearchModal(false);
        }, 400);
      }
    },

    startSearch: debounce(function (refine) {
      refine();
      if (this.searchModal && !this.searchKeyword) {
        this.query = "";
      }
    }, 500),

    transformItems(items) {
      if (items.length > 0) {
        this.hideBanner();
      }
      return [];
    },

    hideBanner() {
      this.showBanner = false;
    },
  },
  mounted() {
    window.moment = moment;
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  .v-navigation-drawer__border {
    display: none;
  }

  .ais-RefinementList-list,
  .ais-NumericMenu-list {
    list-style: none;
    padding-left: 0 !important;
    margin-top: 0;
  }

  .ais-RefinementList-list .ais-RefinementList-item,
  .ais-NumericMenu-list .ais-NumericMenu-item {
    padding: 0;
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
    padding: 1px 8px;
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
    // border: 1px solid rgba(0, 0, 0, 0.1);
    border: none;
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
    max-width: 300px !important;
    min-width: 300px !important;
    width: 300px !important;
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
}
</style>
