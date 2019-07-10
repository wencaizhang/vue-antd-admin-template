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
    getAuthed (state) {
      const { authInfo={} } = state;
      // 认证状态
      const authMap = {
        1: '未认证用户',
        2: '已认证个人用户',
        3: '已认证企业用户',
        4: '个人认证中',
        5: '个人认证未通过',
        6: '企业认证中',
        7: '企业认证未通过',
      }
      return ['2', '3'].includes( authInfo.authType );
    },
  },
  mutations: {
    setUserInfo (state, info) {
      state.userInfo = Object.assign(state.userInfo, info);
    },
    setAuthInfo (state, info) {
      Object.assign(state.authInfo, info, { fetched: true });
    },
    setAuthType (state, type) {
      // 登录时，首次获取认证状态
      // 在认证页面再次获取最新认证状态
      state.authStatus = type;
    }
  },
  actions: {
    fetchUserInfo (context) {
      return getBaseInfo();
    },
    fetchAuthInfo (context) {
      return getAuthInfo();
    },
  },
};
