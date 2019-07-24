export default {
  // vue-ls options
  storageOptions: {
    namespace: 'cmp_admin_', // key prefix
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'local', // storage name session, local, memory
  },

  // 免登录白名单
  whiteList: ['login', 'register', 'forget', 'admin-login']
}