const columns = [
  {
    title: "名称",
    dataIndex: "name",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "描述",
    dataIndex: "phone"
  },

  {
    title: "类型",
    dataIndex: "id"
  },
  {
    title: "容量(GB)",
    dataIndex: "size"
  },
  {
    title: "状态",
    dataIndex: "string"
  },
  {
    title: "挂载主机/盘符",
    dataIndex: "absolutePath"
  },
  {
    title: "可启动",
    dataIndex: "regexp"
  },
  {
    title: "创建于",
    dataIndex: "name.last"
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
    // 根据状态显示不同的操作选项
    // 状态为可用，则全部显示，状态为使用中，则显示 visible: true 的操作选项
    menuOptions: [
      { id: "create", visible: false, name: "新建", menu: false },
      { id: "edit", visible: false, name: "修改" },
      {
        id: "uninstall",
        visible: false,
        name: "卸载硬盘"
      },
      {
        id: "dilatation",
        visible: false,
        name: "扩容"
      },
      {
        id: "mount",
        visible: false,
        name: "加载硬盘到主机"
      },
      {
        id: "createSnapshoot",
        visible: false,
        name: "创建快照"
      },
      {
        id: "createBackups",
        visible: false,
        name: "创建备份"
      },
      {
        id: "changeDiskType",
        visible: false,
        name: "修改硬盘类型"
      },
      {
        id: "cloneDisk",
        visible: false,
        name: "克隆硬盘"
      },
      {
        id: "upload",
        visible: false,
        name: "上传镜像"
      },
      {
        id: "delete",
        visible: false,
        name: "删除硬盘"
      }
    ]
  },
  mutations: {},
  actions: {},
  getters: {}
};
