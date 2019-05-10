const columns = [
  {
    title: "名称",
    dataIndex: "name",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "描述",
    dataIndex: "description"
  },

  {
    title: "类型",
    dataIndex: "type"
  },
  {
    title: "容量(G)",
    dataIndex: "capacity"
  },
  {
    title: "状态",
    dataIndex: "status"
  },
  {
    title: "挂载云主机/盘符",
    dataIndex: "mountHostAndDrive"
  },
  {
    title: "可启动",
    dataIndex: "bootable"
  },
  {
    title: "创建于",
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

    columns,
    // 根据状态显示不同的操作选项
    // 状态为可用，则全部显示，状态为使用中，则显示 visible: true 的操作选项
    menuOptions: [
      { id: "create",          visible: false, type: 'none',   availableStatus: ['available'], name: "新建" },
      { id: "multiDelete",     visible: false, type: 'none',   availableStatus: ['available'], name: "删除" },

      { id: "edit",            visible: false, type: 'single', availableStatus: ['available'], name: "编辑" },
      { id: "uninstall",       visible: false, type: 'single', availableStatus: ['available'], name: "卸载硬盘" },
      { id: "dilatation",      visible: false, type: 'single', availableStatus: ['available'], name: "扩容" },
      { id: "mount",           visible: false, type: 'single', availableStatus: ['available'], name: "加载硬盘到主机" },
      { id: "createSnapshoot", visible: false, type: 'single', availableStatus: ['available'], name: "创建快照" },
      { id: "createBackups",   visible: false, type: 'single', availableStatus: ['available'], name: "创建备份" },
      { id: "changeDiskType",  visible: false, type: 'single', availableStatus: ['available'], name: "修改硬盘类型" },
      { id: "cloneDisk",       visible: false, type: 'single', availableStatus: ['available'], name: "克隆硬盘" },
      { id: "upload",          visible: false, type: 'single', availableStatus: ['available'], name: "上传镜像" },
      { id: "delete",          visible: false, type: 'single', availableStatus: ['available'], name: "删除硬盘" }
    ]
  },
  mutations: {},
  actions: {},
  getters: {}
};
