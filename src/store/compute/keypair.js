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
      { visible: false, type: 'none',   id: "create",      name: "创建", },
      { visible: false, type: 'none',   id: "import",      name: "导入", },
      { visible: false, type: 'batch',  id: "batchDeleta", name: "删除", },
      { visible: false, type: 'batch',  id: "bindTags",    name: "绑定标签", },
      { visible: false, type: 'single', id: "edit",        name: "修改", },
      { visible: false, type: 'single', id: "download",    name: "下载", },
    ],
  },
  mutations: {
  },
  actions: {},
  getters: {}
};
