const columns = [
  {
    title: "编号",
    dataIndex: "workOrderId"
  },
  {
    title: "职位",
    dataIndex: "workOrderTitle",
  },
  {
    title: "登录名",
    dataIndex: "workOrderContent"
  },
  {
    title: "真实姓名",
    dataIndex: ""
  },
  {
    title: "状态",
    dataIndex: ""
  },
  {
    title: "电话",
    dataIndex: "workOrderStatus_zh"
  },
  {
    title: "邮箱",
    dataIndex: "createrName"
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
      { visible: false, type: 'none',   name: "添加", id: "create" },

      { visible: false, type: 'single', name: "启用", id: "enable" },
      { visible: false, type: 'single', name: "停用", id: "disable" },
      { visible: false, type: 'single', name: "删除", id: "delete" },
      { visible: false, type: 'single', name: "修改密码", id: "editPwd" },
    ]
  },
  mutations: {},
  actions: {},
  getters: {}
};
