import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router/index";
import store from "./store/store";
import Vuebar from "vuebar";
import "./plugins/base";
import VueSkycons from "vue-skycons";
import InstantSearch from "vue-instantsearch";
import filter from "./utils/filters";
import Notifications from 'vue-notification'
import VueObserveVisibility from 'vue-observe-visibility';

Vue.use(VueObserveVisibility);
Vue.use(Notifications);
Vue.use(VueSkycons, {
  color: "#1e88e5",
});
Vue.use(InstantSearch);
Vue.config.productionTip = false;
Vue.use(Vuebar);
Vue.use(filter);

new Vue({
  vuetify,
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
