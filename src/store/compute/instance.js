const columns = [
  {
    title: "ID",
    dataIndex: "id"
  },
  {
    title: "名称",
    dataIndex: "name"
  },
  {
    title: "状态",
    dataIndex: "status",
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
    title: "区域",
    dataIndex: "area",
    // filters: [
    //   { text: "北京一区", value: "北京一区" },
    //   { text: "北京二区", value: "北京二区" }
    // ],
    // filterMultiple: false
  },
  {
    title: "映像",
    dataIndex: "image"
  },
  {
    title: "规格",
    dataIndex: "spec"
  },
  {
    title: "网络",
    dataIndex: "netword"
  },
  {
    title: "公网IP",
    dataIndex: "publicIP"
  },
  {
    title: "安全组",
    dataIndex: "securityGroup"
  },
  {
    title: "创建时间",
    dataIndex: "createDate"
  },
  {
    title: "操作",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" }
  }
];
export default {
  namespaced: true,
  state: {
    handleRowData: {},
    columns,
    menuOptions: [
      { visible: false, type: 'none', name: "启动", id: "start" },
      { visible: false, type: 'none', name: "关机", id: "shutdown" },

      { visible: false, type: 'batch', name: "删除", id: "delete" },
      { visible: false, type: 'batch', name: "重启", id: "restart" },
      { visible: false, type: 'batch', name: "软重启", id: "softRestart" },

      // { visible: false, type: 'none', name: "分配公网IP", id: "allotIP" },
      { visible: false, type: 'single', name: "创建快照", id: "createSnapshoot" },
      { visible: false, type: 'single', name: "绑定公网IP", id: "bindIP" },
      { visible: false, type: 'single', name: "解绑公网IP", id: "unbindIP" },
      { visible: false, type: 'single', name: "进入控制台", id: "console" },
      { visible: false, type: 'single', name: "重建云主机", id: "rebuildCloudHost" },
      { visible: false, type: 'single', name: "编辑安全组", id: "editSafetyGroup" },
      { visible: false, type: 'single', name: "删除云主机", id: "deleteCloudHost" },
      { visible: false, type: 'single', name: "查看主机状况", id: "hostDetail" }
    ]
  },
  mutations: {},
  actions: {},
  getters: {}
};
