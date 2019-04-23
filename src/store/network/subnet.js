const columns = [
  {
    title: 'ID',
    dataIndex: 'shortID'
  },
  {
    title: '名称',
    dataIndex: 'name'
  },
  {
    title: '已连接的子网',
    dataIndex: 'connectedSubnet',
  },
  {
    title: '共享',
    dataIndex: 'share'
  },
  {
    title: '管理状态',
    dataIndex: 'adminState_zh'
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'operation' }
  },
];
export default {
  namespaced: true,
  state: {
    columns,
    menuOptions: [
      { visible: false, type: 'none', name: '创建',      id: 'create' },
      { visible: false, type: 'none', name: '删除网络',   id: 'delete' },

      { visible: false, type: 'single', name: '编辑网络', id: 'edit' },
    ]
  },
  mutations: {},
  actions: {},
  getters: {}
};
