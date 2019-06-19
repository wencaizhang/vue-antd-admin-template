import common from "../common";

import order from "./order";
import auditors from "./auditors";
import auth from "./auth";

const store = {
  state: {},
  mutations: {},
  actions: {},
  getters: {},

  modules: {
    order,
    auditors,
    auth,
  }
};

for (let prop in store.modules) {
  Object.assign(store.modules[prop].mutations, common.mutations);
  Object.assign(store.modules[prop].getters, common.getters);
}
export default store
