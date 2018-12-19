import { toggleModalVisible, setHandleRowData } from "../common";
export default {
  namespaced: true,
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
      changeDiskType: false
    },
    handleRowData: {}
  },
  mutations: {
    toggleModalVisible,
    setHandleRowData
  },
  actions: {},
  getters: {}
};
