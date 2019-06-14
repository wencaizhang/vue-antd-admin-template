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
    title: "工单状态",
    dataIndex: "workOrderStatus_zh"
  },
  {
    title: "创建时间",
    dataIndex: "createTime"
  },
  {
    title: "创建用户",
    scopedSlots: { customRender: "operation" }
  },
  {
    title: "处理情况",
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
