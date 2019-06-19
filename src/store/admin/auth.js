const columns = [
  {
    title: "编号",
    dataIndex: "workOrderId"
  },
  {
    title: "认证类型",
    dataIndex: "workOrderTitle",
  },
  {
    title: "审核状态",
    dataIndex: "workOrderContent"
  },
  {
    title: "提交时间",
    dataIndex: ""
  },
  {
    title: "提交人",
    dataIndex: ""
  },
  {
    title: '操作',
    dataIndex: 'singleMenuOptions',
    scopedSlots: { customRender: 'operation' }
  }
];
export default {
  namespaced: true,
  state: {
    columns,
    menuOptions: [
      // { visible: false, type: 'single', name: "详情", id: "detail" },
      // { visible: false, type: 'single', name: "执行审核", id: "check" },
    ]
  },
  mutations: {},
  actions: {},
  getters: {}
};
