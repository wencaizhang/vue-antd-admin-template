import { getBaseInfo, getAuthInfo, } from "@/api/user/user";
export default {
  namespaced: true,
  state: {
    role: 'user',
    // 'admin'
    // 'superAdmin'
    authed: false,
    userInfo: {},
    authInfo: {
      authType: '1',
      fetched: false,
    },
  },
  getters: {
    getRole () {
      return 'user'
    },
    getAuthType (state) {
      const { authInfo={} } = state;
      return authInfo.authType;
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
    setRole (state, role) {
      state.role = role;
    },
    setUserInfo (state, info) {
      state.userInfo = Object.assign(state.userInfo, info);
    },
    setAuthInfo (state, info) {
      Object.assign(state.authInfo, info, { fetched: true });
    },

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
