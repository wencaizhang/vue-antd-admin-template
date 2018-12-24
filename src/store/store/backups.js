
const columns = [
  {
    title: "名称",
    dataIndex: "name",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "描述",
    dataIndex: "phone"
  },

  {
    title: "容量(GB)",
    dataIndex: "size"
  },
  {
    title: "状态",
    dataIndex: "id"
  },
  {
    title: "卷名称",
    dataIndex: "name.last"
  },
  {
    title: "操作",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" }
  }
];

export default {
  namespaced: true,
  state: {

    handleRowData: {},
    columns,
    menuOptions: [
      {
        visible: false,
        id: "recover",
        name: "恢复备份"
      },
      {
        visible: false,
        id: "delete",
        name: "删除硬盘备份"
      }
    ]
  },
  mutations: {
  },
  actions: {},
  getters: {}
};
