import Vue  from 'vue';
import Vuex from 'vuex';
import compute from './compute/index';
import store   from './store/index';
import network from './network/index';
import security from './security/index';
import user from './user/index';
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
    admin,
    user,
    compute,
    store,
    network,
    security,
  }
});
