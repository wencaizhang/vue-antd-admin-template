export default {
  namespaced: true,
  state: {
    userInfo: {},
  },
  mutations: {
    setUserInfo(state, payload) {
      Object.assign(state.userInfo, payload);
    },
    logout(state) {
      state.userInfo = {};
    },
  },
  actions: {},
  getters: {}
};