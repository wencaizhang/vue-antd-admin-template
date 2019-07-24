import common from "../common";

import adminOrder from "./adminOrder";
import auditors from "./auditors";
import auth from "./auth";

const store = {
  state: {},
  mutations: {},
  actions: {},
  getters: {},

  modules: {
    adminOrder,
    auditors,
    auth,
  }
};

for (let prop in store.modules) {
  Object.assign(store.modules[prop].mutations, common.mutations);
  Object.assign(store.modules[prop].getters, common.getters);
}
export default store
