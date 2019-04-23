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
      return state.menuOptions.find(item => item.id === id).visible;
    }
  }
};
