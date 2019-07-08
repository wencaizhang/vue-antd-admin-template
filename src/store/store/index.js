import common from "../common";

import disk from "./disk";
import snapshot from "./snapshot";
import backups from "./backups";

const store = {
  state: {},
  mutations: {},
  actions: {},
  getters: {},

  modules: {
    disk,
    snapshot,
    backups
  }
};

for (let prop in store.modules) {
  Object.assign(store.modules[prop].mutations, common.mutations);
  Object.assign(store.modules[prop].getters, common.getters);
}
export default store
