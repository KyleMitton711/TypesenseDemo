<template>
  <v-row>
    <v-col cols="12" class="black white--text banner px-md-16 py-0">
      <h1>Software discovery</h1>
      <p>Find software for your business, organization or personal use.</p>
      <div class="d-flex align-center">        
        <v-btn large tile color="error" class="mr-2" @click="searchModal = true"> search </v-btn>
        <v-btn text dark large class="" @click="learnMoreDialog = true">For Vendors</v-btn>
      </div>
    </v-col>
    <v-dialog
      v-model="learnMoreDialog"
      width="500"
    >
      <v-card height="400px">
        
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Banner",
  data() {
    return {
      learnMoreDialog: false
    };
  },
  computed: {
    ...mapState(["searchDialog"]),
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
    ...mapActions(["toggleSearchModal"]),
  }
};
</script>

<style lang="scss" scoped>
.banner {
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>