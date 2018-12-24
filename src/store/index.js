import Vue from 'vue';
import Vuex from 'vuex';
import compute from "./compute/index";
import store from "./store/index";
import network from "./network/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    compute,
    store,
    network,
  }
});
