import Vue  from 'vue';
import Vuex from 'vuex';

import app from './app';
import compute from './compute/index';
import store   from './store/index';
import network from './network/index';
import security from './security/index';
import user from './user/index';
import order from './order/order';

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
    user,
    compute,
    store,
    network,
    security,
    order
  }
});
