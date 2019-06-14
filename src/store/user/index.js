import common from "../common";

import order from "./order";
import user  from './user';

const store = {
  state: {},
  mutations: {},
  actions: {},
  getters: {},

  modules: {
    order,
    user,
  }
};

for (let prop in store.modules) {
  Object.assign(store.modules[prop].mutations, common.mutations);
  Object.assign(store.modules[prop].getters, common.getters);
}
export default store
