export default {
  namespaced: true,
  mutations: {
    toggleModalVisible: (state, id = "") => {
      let visible;
      let item;
      if (id) {
        item = state.singleOperations.find(item => item.id === id);
        if (!item) {
          return false;
        }
        visible = item.visible;
      }
      state.singleOperations.forEach(item => (item.visible = false));
      item.visible = !visible;
    },
    setHandleRowData: (state, record) => {
      Object.assign(state.handleRowData, record);
    }
  },
  actions: {},
  getters: {
    getVisibleById: state => id => {
      return state.singleOperations.find(item => item.id === id).visible;
    }
  }
};
