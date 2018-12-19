export default {
  state: {
    modalVisible: {
      create: false,
      edit: false,
      uninstall: false,
      dilatation: false,
      mount: false,
      createSnapshoot: false,
      createBackups: false,
      delete: false,
      upload: false,
      changeDiskType: false,
    },
    handleRowData: {}
  },
  mutations: {
    toggleModalVisible: (state, name = "") => {
      let visible;
      if (name) {
        visible = state.modalVisible[name];
      }
      for (let prop in state.modalVisible) {
        state.modalVisible[prop] = false;
      }
      if (name) {
        state.modalVisible[name] = !visible;
      }
    },
    setHandleRowData: (state, record) => {
      Object.assign(state.handleRowData, record);
    }
  },
  actions: {},
  getters: {}
};
