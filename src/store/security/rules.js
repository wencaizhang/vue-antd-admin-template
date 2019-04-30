const columns = [
  {
    title: "方向",
    dataIndex: "direction_zh"
  },
  {
    title: "以太网类型",
    dataIndex: "etherType"
  },
  {
    title: "IP协议",
    dataIndex: "protocol"
  },
  {
    title: "端口范围",
    dataIndex: "portScope",
    sorter: (a, b) => { return (parseInt(a.portRangeMin) || 0) - (parseInt(b.portRangeMin) || 0) },
  },
  {
    title: "远端IP前缀",
    dataIndex: "remoteIpPrefix"
  },
  {
    title: "远端安全组",
    dataIndex: "remoteGroupId"
  },
  {
    title: "操作",
    dataIndex: "singleMenuOptions",
    scopedSlots: { customRender: "operation" }
  }
];
export default {
  namespaced: true,
  state: {
    columns,
    menuOptions: [
      { visible: false, type: "none",   id: "create",      name: "创建" },
      { visible: false, type: "none",   id: "multiDeleta", name: "删除" },
      { visible: false, type: "single", id: "delete",      name: "删除" }
    ]
  },
  mutations: {},
  actions: {},
  getters: {}
};
