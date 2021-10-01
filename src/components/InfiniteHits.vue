<template>
  <v-row v-if="state" class="hits-list">
    <h3 class="videos-count">Found <b>{{ state.results.nbHits | formatCount }}</b> videos</h3>
    <v-col
      cols="12"
      :sm="viewMode ? 12 : (Sidebar_drawer ? 6 : 4)"
      :lg="viewMode ? 12 : (Sidebar_drawer ? 4 : 3)"
      :xl="viewMode ? 12 : (Sidebar_drawer ? 3 : 2)"
      v-for="hit in state.hits"
      :key="hit.objectID"
    >
      <slot name="item" :item="hit"> </slot>
    </v-col>
    <li class="sentinel" v-observe-visibility="visibilityChanged" />
  </v-row>
</template>

<script>
import { createWidgetMixin } from "vue-instantsearch";
import { connectInfiniteHits } from "instantsearch.js/es/connectors";
import { mapGetters, mapState } from "vuex";

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
      console.log(val)
      if (val.results.page == 0) {
        // window.scrollTo(0, 0);
      }
    },
  },
  computed: {
    ...mapGetters(["viewMode"]),
    ...mapState(["Sidebar_drawer"]),
  },
};
</script>

<style scoped>
.sentinel {
  list-style-type: none;
}

.videos-count {
  position: absolute;
  left: 15px;
  top: -50px;
}
</style>