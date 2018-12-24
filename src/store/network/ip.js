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
];
export default {
  namespaced: true,
  state: {
    handleRowData: {},
    columns,
    menuOptions: [
      { visible: false, type: 'none', name: "申请IP", id: "create" },

      { visible: false, type: 'batch', name: "绑定IP", id: "bind-ip" },
      { visible: false, type: 'batch', name: "解绑IP", id: "unbind-ip" },
      { visible: false, type: 'batch', name: "释放IP", id: "free-ip" },
    ]
  },
  mutations: {},
  actions: {},
  getters: {}
};
