import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";

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
  data() {
    return {
      searchClient,
      query: "",
      page: 1,
      searchKeyword: "",
      hitsPerPage: 5,
      menu: false,
      dates: [],
    };
  },
}