import common from "../common";

import user  from './user';
import security  from './security';

const store = {
  state: {},
  mutations: {},
  actions: {},
  getters: {},

  modules: {
    user,
    security,
  }
};

for (let prop in store.modules) {
  Object.assign(store.modules[prop].mutations, common.mutations);
  Object.assign(store.modules[prop].getters, common.getters);
}
export default store
