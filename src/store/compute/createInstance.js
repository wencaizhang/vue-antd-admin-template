
export default {
  namespaced: true,
  state: {
    // 只有当实例处于 availableStatus 中的状态时，对应的操作才可用
    menuOptions: [
      { visible: false, type: 'none',  name: '创建网络', id: 'create', },
    ]
  },
  mutations: {},
  actions: {},
  getters: {}
};
