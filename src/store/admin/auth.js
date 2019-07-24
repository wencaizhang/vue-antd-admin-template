const columns = [
  {
    title: "认证编号",
    dataIndex: "authNumber"
  },
  {
    title: "账号名称",
    dataIndex: "authenticationInfo.userName"
  },
  {
    title: "提交人",
    dataIndex: "authenticationInfo.realName"
  },
  {
    title: "认证类型",
    sorter: true,
    dataIndex: "authorizeType",
  },
  {
    title: "提交时间",
    sorter: true,
    dataIndex: "applicationTime"
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'operation' }
  }
];
export default {
  namespaced: true,
  state: {
    columns,
    menuOptions: [
      { visible: false, type: 'single', name: "详情", id: "detail" },
      { visible: false, type: 'single', name: "执行审核", id: "check" },
    ]
  },
  mutations: {},
  actions: {},
  getters: {}
};
