import common from "../common";

import order from "./order";

const store = {
  state: {},
  mutations: {},
  actions: {},
  getters: {},

  modules: {
    order,
  }
};

for (let prop in store.modules) {
  Object.assign(store.modules[prop].mutations, common.mutations);
  Object.assign(store.modules[prop].getters, common.getters);
}
export default store
