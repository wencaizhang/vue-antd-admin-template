import Vue  from 'vue';
import Vuex from 'vuex';

import app from './app';
import admin from './admin/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    app,
    admin,
  }
});
