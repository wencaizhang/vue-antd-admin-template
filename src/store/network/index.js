import common from "../common";

import router from "./router";
import ip from "./ip";
import subnet from "./subnet";

const store = {
  state: {},
  mutations: {},
  actions: {},
  getters: {},

  modules: {
    router,
    ip,
    subnet
  }
};

for (let prop in store.modules) {
  Object.assign(store.modules[prop].mutations, common.mutations);
  Object.assign(store.modules[prop].getters, common.getters);
}
export default store
