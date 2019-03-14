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
    title: "状态",
    dataIndex: "phone",
    filters: [
      { text: "等待中", value: "等待中" },
      { text: "运行中", value: "运行中" },
      { text: "已暂停", value: "已暂停" },
      { text: "已关闭", value: "已关闭" },
      { text: "已删除", value: "已删除" },
      { text: "重启中", value: "重启中" }
    ],
    filterMultiple: false
  },
  {
    title: "外部网络",
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

      { visible: false, type: 'batch', name: "删除", id: "delete" },
      { visible: false, type: 'batch', name: "设置网关", id: "gateway" },
      { visible: false, type: 'batch', name: "清除网关", id: "clearGateway" },

      { visible: false, type: 'single', name: "修改", id: "edit" },
    ]
  },
  mutations: {},
  actions: {},
  getters: {}
};
