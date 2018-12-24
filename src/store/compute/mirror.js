const columns = [
  {
    title: "ID",
    dataIndex: "id",
    scopedSlots: { customRender: "operation" }
  },
  {
    title: "名称",
    dataIndex: "name.first"
  },
  {
    title: "状态",
    dataIndex: "phone",
    filters: [
      { text: "状态", value: "状态" },
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
    title: "容量（G)",
    dataIndex: "size"
  },
  {
    title: "平台",
    dataIndex: "regexp"
  }
];
export default {
  namespaced: true,
  state: {
    handleRowData: {},
    columns,
    menuOptions: [
      {
        visible: false,
        id: "create",
        name: "创建",
        menu: "none"
      },
      {
        visible: false,
        id: "edit",
        name: "编辑",
        menu: "none"
      },
      {
        visible: false,
        id: "detail",
        name: "详情",
        menu: "none"
      },
    ]
  },
  mutations: {},
  actions: {},
  getters: {}
};
