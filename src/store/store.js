export default {
  state: {
    modalVisible: {
      edit: false,
      uninstall: false,
      dilatation: false,
      mount: false,
      createSnapshoot: false,
      createBackups: false,
      delete: false,
      upload: false,
      changeDiskType: false,
    }
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
    }
  },
  actions: {},
  getters: {}
};
