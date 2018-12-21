import common from "../common";

import instance from "./instance";
import mirror from "./mirror";
import keypair from "./keypair";

const store = {
  state: {},
  mutations: {},
  actions: {},
  getters: {},

  modules: {
    instance,
    mirror,
    keypair
  }
};

for (let prop in store.modules) {
  Object.assign(store.modules[prop].mutations, common.mutations);
  Object.assign(store.modules[prop].getters, common.getters);
}
export default store
