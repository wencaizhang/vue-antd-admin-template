
const columns = [
  {
    title: "名称",
    dataIndex: "name",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "描述",
    dataIndex: "description"
  },

  {
    title: "容量(G)",
    dataIndex: "capacity"
  },
  {
    title: "状态",
    dataIndex: "status_zh"
  },
  {
    title: "卷名称",
    dataIndex: "volumeName"
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

    columns,
    menuOptions: [
      { visible: false, type: 'none', id: "multiDelete", name: "删除" },

      { visible: false, type: 'single', id: "recover", name: "恢复备份" },
      { visible: false, type: 'single', id: "delete",  name: "删除硬盘备份" },
    ]
  },
  mutations: {
  },
  actions: {},
  getters: {}
};
