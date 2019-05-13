const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '描述',
    dataIndex: 'description'
  },

  {
    title: '类型',
    dataIndex: 'type'
  },
  {
    title: '容量(G)',
    dataIndex: 'capacity'
  },
  {
    title: '状态',
    dataIndex: 'status_zh'
  },
  {
    title: '挂载云主机/盘符',
    dataIndex: 'mountHostAndDrive'
  },
  {
    title: '可启动',
    dataIndex: 'bootable_zh'
  },
  {
    title: '创建于',
    dataIndex: 'createDate',
    sorter: (a, b) => { return a.timestamp - b.timestamp },
  },
  {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' }
  }
];
export default {
  namespaced: true,
  state: {

    columns,
    // 根据状态显示不同的操作选项
    // 状态为可用，则全部显示，状态为使用中，则显示 visible: true 的操作选项
    menuOptions: [
      { id: 'create',          name: '新建',          visible: false, type: 'none',   availableStatus: ['available'],  },
      { id: 'multiDelete',     name: '删除',          visible: false, type: 'none',   availableStatus: ['available'],  },

      { id: 'edit',            name: '编辑',          visible: false, type: 'single', availableStatus: ['available', 'in-use'],  },
      { id: 'uninstall',       name: '卸载硬盘',      visible: false, type: 'single', availableStatus: ['in-use'],  },
      { id: 'dilatation',      name: '扩容',          visible: false, type: 'single', availableStatus: ['available'],  },
      { id: 'mount',           name: '加载硬盘到主机', visible: false, type: 'single', availableStatus: ['available'],  },
      { id: 'createSnapshoot', name: '创建快照',      visible: false, type: 'single', availableStatus: ['available', 'in-use'],  },
      { id: 'createBackups',   name: '创建备份',      visible: false, type: 'single', availableStatus: ['available'],  },
      { id: 'changeDiskType',  name: '修改硬盘类型',   visible: false, type: 'single', availableStatus: ['available'],  },
      { id: 'cloneDisk',       name: '克隆硬盘',      visible: false, type: 'single', availableStatus: ['available'],  },
      { id: 'upload',          name: '上传镜像',      visible: false, type: 'single', availableStatus: ['available', 'in-use'],  },
      { id: 'delete',          name: '删除硬盘',      visible: false, type: 'single', availableStatus: ['available'],  }
    ],
  },
  mutations: {},
  actions: {},
  getters: {}
};
