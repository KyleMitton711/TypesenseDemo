import Vue from "vue";
import Vuex from "vuex";

import auth from "./modules/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchDialog: false,
    Sidebar_drawer: false,
    Customizer_drawer: false,
    SidebarColor: "white", //Change Sidebar Color || 'white', | "#2b2b2b" | "rgb(44, 59, 164)" | "rgb(96, 44, 164)" | "rgb(151, 210, 219)" | "rgb(77, 86, 100)"
    SidebarBg: "",
    navbarColor: "white",
    setHorizontalLayout: false, // Horizontal layout
    authModal: "",
    isListViewMode: true,
    showMainFilterMenu: false,
    facetFilters: [],
    query: ""
  },
  mutations: {
    SET_SIDEBAR_DRAWER(state, payload) {
      state.Sidebar_drawer = payload;
    },
    SET_CUSTOMIZER_DRAWER(state, payload) {
      state.Customizer_drawer = payload;
    },
    SET_SIDEBAR_COLOR(state, payload) {
      state.SidebarColor = payload;
    },
    SET_NAVBAR_COLOR(state, payload) {
      state.navbarColor = payload;
    },
    SET_LAYOUT(state, payload) {
      state.setHorizontalLayout = payload;
    },
    SET_AUTH_MODAL(state, payload) {
      state.authModal = payload;
    },
    SET_SEARCH_DIALOG(state, payload) {
      state.searchDialog = payload;
    },
    SET_VIEW_MODE(state, payload) {
      state.isListViewMode = payload;
    },
    SET_MAIN_FILTER_MENU(state, payload) {
      state.showMainFilterMenu = payload;
    },
    SET_FACETFILTER(state, payload) {
      state.facetFilters = Object.assign([], payload);
    },
    SET_QUERY(state, payload) {
      state.query = payload;
    }
  },
  actions: {
    toggleAuthModal({ commit }, show) {
      commit('SET_AUTH_MODAL', show);
    },
    toggleSearchModal({ commit }, show) {
      commit('SET_SEARCH_DIALOG', show);
    },
    toggleViewMode({ commit }, mode) {
      commit('SET_VIEW_MODE', mode);
    },
    toggleMainFilterMenu({ commit }, mode) {
      commit('SET_MAIN_FILTER_MENU', mode);
    },
    setFacetFilters({ commit }, filters) {
      commit('SET_FACETFILTER', filters);
    },
    setQuery({ commit }, query) {
      commit('SET_QUERY', query);
    },
  },
  getters: {
    authModal: (state) => state.authModal,
    searchDialog: (state) => state.searchDialog,
    viewMode: (state) => state.isListViewMode,
    showMainFilterMenu: (state) => state.showMainFilterMenu,
    facetFilters: (state) => state.facetFilters,
    customQuery: (state) => state.query
  },
  namespace: true,
  modules: {
    auth,
  }
});
