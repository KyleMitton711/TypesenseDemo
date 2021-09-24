<template>
  <v-row v-if="state" class="hits-list">
    <v-col cols="12" :sm="viewMode ? 12 : 6" :xl="viewMode ? 12 : 4" v-for="hit in state.hits" :key="hit.objectID">
      <slot name="item" :item="hit"> </slot>
    </v-col>
    <li class="sentinel" v-observe-visibility="visibilityChanged" />
  </v-row>
</template>

<script>
import { createWidgetMixin } from "vue-instantsearch";
import { connectInfiniteHits } from "instantsearch.js/es/connectors";
import { mapGetters } from "vuex";

export default {
  name: "InfiniteHits",
  mixins: [createWidgetMixin({ connector: connectInfiniteHits })],
  methods: {
    visibilityChanged(isVisible) {
      if (isVisible && !this.state.isLastPage) {
        this.state.showMore();
      }
    },
  },
  watch: {
    state(val) {
      if (val.results.page == 0) {
        window.scrollTo(0, 0);
      }
    },
  },
  computed: {
    ...mapGetters(["viewMode"])
  }
};
</script>

<style scoped>
.sentinel {
  list-style-type: none;
}
</style>