
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

    singleOperations: [
      {
        id: "create",
        visible: false,
        name: "创建硬盘"
      },
      {
        id: "edit",
        visible: false,
        name: "编辑硬盘快照"
      },
      {
        id: "delete",
        visible: false,
        name: "删除硬盘快照"
      },
      {
        id: "batchDelete",
        visible: false,
        name: "批量删除",
        menu: false,
      },
    ]
  },
  mutations: {
  },
  actions: {},
  getters: {}
};
