import common from "../common";

import group from "./group";
import rules from "./rules";

const store = {
  state: {},
  mutations: {},
  actions: {},
  getters: {},

  modules: {
    group,
    rules
  }
};

for (let prop in store.modules) {
  Object.assign(store.modules[prop].mutations, common.mutations);
  Object.assign(store.modules[prop].getters, common.getters);
}
export default store
