export default {
  namespaced: true,
  mutations: {
    toggleModalVisible: (state, id = "") => {
      state.menuOptions.forEach(item => {
        if(item.id === id) {
          item.visible = !item.visible;
        } else {
          item.visible = false;
        }
      });
    },
    clearModal: state => state.menuOptions.forEach(item => item.visible = false),

  },
  actions: {},
  getters: {
    getVisibleById: state => id => {
      const option = state.menuOptions.find(item => item.id === id);
      if (!option) {
        throw new Error(`在 menuOptions 中不存在 ${id} 项`);
        return false;
      }
      return option.visible;
    }
  }
};
