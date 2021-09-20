<template>
  <v-row>
    <v-col cols="12" class="black white--text banner px-md-16 py-0">
      <h1>Hello World</h1>
      <p>Amazon - Fire TV Stick with Alexa Voice Remote - Black</p>
      <div class="d-flex align-center">
        <v-btn class="mr-2" @click="learnMoreDialog = true"> learn more </v-btn>
        <span>for manufacturer</span>
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
export default {
  name: "Banner",
  data() {
    return {
      learnMoreDialog: false
    };
  }
};
</script>

<style lang="scss" scoped>
.banner {
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>