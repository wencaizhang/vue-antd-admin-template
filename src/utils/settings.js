// 免登录白名单
export const whiteList = ['login', 'register', 'forget', 'admin-login']

// vue-ls options
export const storageOptions = {
  namespace: 'cmp__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'local', // storage name session, local, memory
}