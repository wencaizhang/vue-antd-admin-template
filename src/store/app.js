import Vue from 'vue';
import { LOGINFO } from "@/store/mutation-types";
import { getBaseInfo, getAuthInfo, } from "@/api/user/user";
export default {
  namespaced: true,
  state: {
    authStatus: 1,
    userInfo: {},
    authInfo: {},
  },
  getters: {
    getLogInfo () {
      return Vue.ls.get(LOGINFO) || {}
    },
  },
  mutations: {
    setUserInfo (state, info) {
      state.userInfo = Object.assign(state.userInfo, info);
    },
    setAuthType (state, type) {
      // 登录时，首次获取认证状态
      // 在认证页面再次获取最新认证状态
      state.authStatus = type;
    },
  },
  actions: {
    fetchUserInfo (context) {
      return getBaseInfo();
    },
  },
};
