import Vue from 'vue';
import Vuex from 'vuex';

// Modules
import appLoader from './modules/appLoader';
import postings from './modules/postings';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    appLoader,
    postings,
  },
});
