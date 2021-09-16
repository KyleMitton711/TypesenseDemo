<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <ais-instant-search index-name="items" :search-client="searchClient">
          <v-row no-gutters>
            <v-col cols="12">
              <ais-index index-name="items">
                <ais-configure :hitsPerPage="5" />
                <ais-autocomplete>
                  <template slot-scope="{ indices, refine }">
                    <v-combobox
                      dense
                      solo
                      :items="
                        indices.filter(({ indexId }) => indexId === 'items')[0].hits
                      "
                      item-text="name"
                      placeholder="Search here…"
                      @update:search-input="refine"
                      :search-input.sync="searchKeyword"
                      @change="onSelect"
                      clearable
                    >
                    </v-combobox>
                  </template>
                </ais-autocomplete>
              </ais-index>
              <ais-current-refinements />
              <ais-index index-name="items">
                <ais-configure
                  :query="query"
                  :query-parameters="{'page': page}"
                  :queryType="'prefixAll'"
                  :hitsPerPage="hitsPerPage"
                />
                <infinite-hits>
                  <template slot="item" slot-scope="{ item }">
                    <div
                      class="
                        mb-5
                        col-12
                        border-bottom
                        pa-5
                        d-flex
                        flex-wrap flex-sm-nowrap
                        justify-center justify-sm-left
                      "
                    >
                      <div class="text-center mr-5">
                        <img
                          :src="'https://cdn-demo.algolia.com/bestbuy-0118/4984700_sb.jpg'"
                          align="left"
                          class=""
                        />
                        <div
                          class="
                            hit-price
                            info--text
                            mt-3
                            font-weight-medium
                            text-truncate
                          "
                        >
                          $ {{ item.price }}
                        </div>
                      </div>
                      <div class="mt-4 mt-sm-0">
                        <h2 class="title">{{ item.name }}</h2>
                        <div class="hit-name subtitle-2">
                          <ais-highlight
                            attribute="name"
                            :hit="item"
                          ></ais-highlight>
                        </div>

                        <div class="d-flex mt-4">
                          <v-btn depressed color="primary"> Add to cart </v-btn>
                          <v-btn icon color="red" class="ml-4">
                            <v-icon>mdi-heart</v-icon>
                          </v-btn>
                        </div>

                        <!-- <div class="hit-description subtitle-2">
                          <ais-highlight
                            attribute="description"
                            :hit="item"
                          ></ais-highlight>
                        </div> -->
                      </div>
                    </div>
                  </template>
                </infinite-hits>
              </ais-index>
            </v-col>
          </v-row>
        </ais-instant-search>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";
import InfiniteHits from '@/components/InfiniteHits';

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
    queryBy: "name",
  },
});
const searchClient = typesenseInstantsearchAdapter.searchClient;

export default {
  name: "Home",
  components: { InfiniteHits },
  data() {
    return {
      searchClient,
      query: "",
      page: 1,
      searchKeyword: null,
      hitsPerPage: 12
    };
  },
  methods: {
    onSelect(selected) {
      if (selected) {
        console.log(selected);
        console.log(typeof(selected));
        if (typeof(selected) == "object") {
          this.query = selected.name;
        } else {
          this.query = selected;
        }
      }
    },
  }
};
</script>

<style lang="scss">
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
  margin-bottom: 10px;
  line-height: normal;
  margin-top: 5px;
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
