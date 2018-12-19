import { toggleModalVisible, setHandleRowData } from "../common";
export default {
  namespaced: true,
  state: {
    modalVisible: {
      create: false,
      edit: false,
      delete: false,
      batchDelete: false,
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
