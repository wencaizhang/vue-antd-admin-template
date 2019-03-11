const columns = [
  {
    title: "ID",
    dataIndex: "id"
  },
  {
    title: "名称",
    dataIndex: "name.first"
  },
  {
    title: "已连接的子网",
    dataIndex: "phone",
  },
  {
    title: "共享",
    dataIndex: ""
  },
  {
    title: "运行状态",
    dataIndex: ""
  },
  {
    title: "可用域",
    dataIndex: ""
  },
  {
    title: "操作",
    scopedSlots: { customRender: "operation" }
  },
];
export default {
  namespaced: true,
  state: {
    handleRowData: {},
    columns,
    menuOptions: [
      { visible: false, type: 'none', name: "创建", id: "create" },

      { visible: false, type: 'single', name: "编辑网络", id: "edit" },
      { visible: false, type: 'batch', name: "删除网络", id: "delete" },
    ]
  },
  mutations: {},
  actions: {},
  getters: {}
};
