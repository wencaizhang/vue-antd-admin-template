const columns = []
export default {
  namespaced: true,
  state: {
    columns,
    menuOptions: [
      { visible: false, type: 'none', id: 'editEmail', name: '修改邮箱', },
      { visible: false, type: 'none', id: 'editPhone', name: '修改手机号', },
      { visible: false, type: 'none', id: 'editPwd', name: '修改密码', },
    ]
  },
  mutations: {},
  actions: {},
  getters: {}
};
