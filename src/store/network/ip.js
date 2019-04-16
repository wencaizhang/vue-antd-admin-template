const columns = [
  {
    title: "IP",
    dataIndex: "ipAddress"
  },
  {
    title: "描述",
    dataIndex: "description"
  },
  {
    title: "状态",
    dataIndex: "isBind",
  },
  {
    title: "已映射固定IP",
    dataIndex: "mappedStaticIp"
  },
  {
    title: "资源池",
    dataIndex: "pool"
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
