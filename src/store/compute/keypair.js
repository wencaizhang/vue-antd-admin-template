const columns = [
  {
    title: "名称",
    dataIndex: "name.first"
  },
  {
    title: "创建时间",
    dataIndex: "phone"
  },
  {
    title: "加密方法",
    dataIndex: "id"
  },
  {
    title: "所属项目",
    dataIndex: ""
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
        id: "create",
        name: "创建",
        type: 'none',
      },
      {
        visible: false,
        id: "import",
        name: "导入",
        type: 'none',
      },
      {
        visible: false,
        id: "batchDeleta",
        name: "删除",
        type: 'batch',
      },
      {
        visible: false,
        id: "bindTags",
        name: "绑定标签",
        type: 'batch',
      },
      {
        visible: false,
        id: "edit",
        name: "修改",
        type: 'single',
      },
      {
        visible: false,
        id: "download",
        name: "下载",
        type: 'single',
      },

    ],
  },
  mutations: {
  },
  actions: {},
  getters: {}
};
