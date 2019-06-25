import { getBaseInfo, getAuthInfo, } from "@/api/user/user";
export default {
  namespaced: true,
  state: {
    role: 'user',
    // 'admin'
    // 'superAdmin'

    userInfo: {},
    authInfo: {},
  },
  mutations: {
    setRole (state, role) {
      state.role = role;
    },
    setUserInfo (state, info) {
      Object(state.userInfo, info);
    },
    setAuthInfo (state, info) {
      Object(state.authInfo, info);
    },

  },
  actions: {
    async fetchUserInfo (context) {
      try {
        const resp = await getBaseInfo();
        context.commit('setUserInfo', resp);
      } catch (error) {
        
      }
    },
    async fetchAuthInfo (context) {
      try {
        const resp = await getAuthInfo();
        context.commit('setAuthInfo', resp);
      } catch (error) {
        
      }
    },
  },
  getters: {}
};
