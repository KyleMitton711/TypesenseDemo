<template>
  <v-container fluid class="pt-0">
    <Banner />
    <v-row>
      <v-col cols="12">
        <ais-instant-search index-name="items" :search-client="searchClient">
          <v-row no-gutters>
            <v-col cols="12">
              <!-- <ais-current-refinements /> -->
              <ais-index index-name="items">
                <v-row>
                  <v-col cols="12" sm="3" v-if="Sidebar_drawer">
                    <h2 class="title">DATE</h2>
                    <ais-numeric-menu
                      attribute="added"
                      :items="dateItems"
                    >
                      <template v-slot="{ items, refine }">
                        <ul class="ais-NumericMenu-list">
                          <li class="ais-NumericMenu-item" :class="item.isRefined ? 'ais-NumericMenu-item--selected' : '' " v-for="(item, index) in items.slice(0, -1)" :key="index">
                            <label class="ais-NumericMenu-label">
                              <input
                                class="ais-NumericMenu-radio"
                                type="radio"
                                name="NumericMenu"
                                :value="item.value"
                                @click.prevent="refine(item.value)"
                                :checked="(item.isRefined && !showCustomDateRangePicker) ? 'checked' : '' "
                              />
                              <span class="ais-NumericMenu-labelText">
                                {{ item.label }}
                              </span>
                            </label>
                          </li>
                          <li class="ais-NumericMenu-item" :class="showCustomDateRangePicker ? 'ais-NumericMenu-item--selected' : '' " v-for="(item, index) in items.slice(items.length - 1, items.length)" :key="index + 'last'">
                            <label class="ais-NumericMenu-label">
                              <input
                                class="ais-NumericMenu-radio"
                                type="radio"
                                name="NumericMenu"
                                :value="item.value"
                                @click.prevent="showCustomDateRangePicker = true"
                                :checked="showCustomDateRangePicker ? 'checked' : '' "
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
                            <v-date-picker
                              v-model="dates"
                              range
                              no-title
                            >
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
                  </v-col>
                  <v-col cols="12" sm="9">
                    <ais-configure
                      :query="query"
                      :query-parameters="{ page: page }"
                      :hitsPerPage="hitsPerPage"
                    />
                    <infinite-hits>
                      <template slot="item" slot-scope="{ item }">
                        <div
                          class="
                            border-bottom
                            pa-5
                            d-flex
                            flex-wrap flex-sm-nowrap
                          "
                        >
                          <div class="text-center d-flex flex-column mr-5">
                            <img
                              :src="'https://cdn-demo.algolia.com/bestbuy-0118/4984700_sb.jpg'"
                              align="left"
                              class=""
                            />
                          </div>
                          <div class="mt-4 mt-sm-0">
                            <div class="hit-name title d-flex">
                              <ais-highlight
                                attribute="name"
                                :hit="item"
                              ></ais-highlight>
                              <div
                                class="
                                  hit-price
                                  info--text
                                  ml-2
                                  font-weight-medium
                                  text-truncate
                                "
                              >
                                $ {{ item.price }}
                              </div>
                            </div>

                            <div class="hit-description subtitle-2">
                              <ais-highlight
                                attribute="description"
                                :hit="item"
                              ></ais-highlight>
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
                  </v-col>
                </v-row>
              </ais-index>
            </v-col>
          </v-row>
        </ais-instant-search>
      </v-col>
    </v-row>
    <v-dialog
      v-model="searchModal"
      width="500"
      permanent
    >
      <v-card>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <ais-instant-search index-name="items" :search-client="searchClient">
                  <ais-index index-name="items">
                    <ais-configure :hitsPerPage="5" />
                    <ais-autocomplete>
                      <template slot-scope="{ indices, refine }">
                        <v-combobox
                          dense
                          solo
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
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";
import debounce from "debounce";
import moment from "moment";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import InfiniteHits from "@/components/InfiniteHits";
import Banner from "@/components/Banner";

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: process.env.VUE_APP_TYPESENSE_API_KEY, // Be sure to use an API key that only allows search operations
    nodes: [
      {
        host: process.env.VUE_APP_TYPESENSE_HOST,
        port: process.env.VUE_APP_TYPESENSE_PORT,
        protocol: process.env.VUE_APP_TYPESENSE_PROTOCAL,
      },
    ],
    // cacheSearchResultsForSeconds: 2 * 60, // Cache search results from server. Defaults to 2 minutes. Set to 0 to disable caching.
  },
  // The following parameters are directly passed to Typesense's search API endpoint.
  //  So you can pass any parameters supported by the search endpoint below.
  //  queryBy is required.
  additionalSearchParameters: {
    queryBy: "name,description",
  },
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

export default {
  name: "Home",
  components: { 
    InfiniteHits, 
    Banner
  },
  data() {
    return {
      searchClient,
      query: "",
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
          start: moment().startOf('day').valueOf(), 
          end: moment().endOf('day').valueOf()
        },
        { 
          label: "Yesterday", 
          start: moment().subtract(1, 'days').startOf('day').valueOf(), 
          end: moment().subtract(1, 'days').endOf('day').valueOf()
        },
        { 
          label: "Last 7 Days", 
          start: moment().subtract(7, 'days').startOf('day').valueOf(), 
          end: moment().endOf('day').valueOf()
        },
        { 
          label: "Last 30 Days", 
          start: moment().subtract(30, 'days').startOf('day').valueOf(), 
          end: moment().endOf('day').valueOf() 
        },
        { 
          label: "This Month",
          start: moment().subtract(1, 'months').startOf('day').valueOf(), 
          end: moment().endOf('day').valueOf() 
        },
        { 
          label: "Custom Range",
          start: moment().subtract(1, 'months').startOf('day').valueOf(), 
          end: moment().endOf('day').valueOf() 
        }
      ],
    };
  },
  computed: {
    ...mapGetters(["searchDialog"]),
    ...mapState(["Sidebar_drawer"]),
    searchModal: {
      get() {
        return this.searchDialog;
      },
      set(val) {
        this.toggleSearchModal(val);
      }
    },
    dateRangeText () {
      return this.dates.join(' ~ ')
    },
  },
  methods: {
    ...mapActions(["toggleSearchModal"]),

    onSelect(selected) {
      if (selected) {
        this.query = selected;
        this.toggleSearchModal(false);
      }
    },

    startSearch: debounce(function (refine) {
      refine();
      if (this.searchModal && !this.searchKeyword) {
        this.query = "";
      }
    }, 500),
  },
  mounted() {
    window.moment = moment;
  },
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
/* } */

@media (min-width: 1900px) {
  li.ais-Hits-item {
    width: 33.33%;
    float: left;
  }
}
</style>
