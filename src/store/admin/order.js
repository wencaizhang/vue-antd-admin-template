const columns = [
  {
    title: "工单编号",
    dataIndex: "workOrderId"
  },
  {
    title: "工单标题",
    dataIndex: "workOrderTitle",
  },
  {
    title: "工单内容",
    dataIndex: "workOrderContent"
  },
  {
    title: "工单提交时间",
    dataIndex: ""
  },
  {
    title: "工单完成时间",
    dataIndex: ""
  },
  {
    title: "工单状态",
    dataIndex: "workOrderStatus_zh"
  },
  {
    title: "工单处理人",
    dataIndex: "createrName"
  },
  {
    title: "工单提交人",
    dataIndex: "createrName"
  },
];
export default {
  namespaced: true,
  state: {
    columns,
    menuOptions: [
      { visible: false, type: 'none',   name: "创建工单", id: "create" },
    ]
  },
  mutations: {},
  actions: {},
  getters: {}
};
