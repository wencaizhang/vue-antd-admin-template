const columns = [
  {
    title: "IP",
    dataIndex: "ip"
  },
  {
    title: "描述",
    dataIndex: "description"
  },
  {
    title: "状态",
    dataIndex: "status_zh",
    // filters: [
    //   { text: "等待中", value: "等待中" },
    //   { text: "运行中", value: "运行中" },
    //   { text: "已暂停", value: "已暂停" },
    //   { text: "已关闭", value: "已关闭" },
    //   { text: "已删除", value: "已删除" },
    //   { text: "重启中", value: "重启中" }
    // ],
    // filterMultiple: false
  },
  {
    title: "已映射固定IP",
    dataIndex: "mappedStaticIp"
  },
  {
    title: "资源池",
    dataIndex: "resourcePool"
  },
  {
    title: "带宽上限(Mbps)",
    dataIndex: "bandwidthLimit"
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
      { visible: false, type: 'none',   name: "申请IP", id: "create" },

      { visible: false, type: 'single', name: "绑定IP", id: "bind-ip" },
      { visible: false, type: 'batch',  name: "解绑IP", id: "unbind-ip" },
      { visible: false, type: 'batch',  name: "释放IP", id: "free-ip" },
    ]
  },
  mutations: {},
  actions: {},
  getters: {}
};
