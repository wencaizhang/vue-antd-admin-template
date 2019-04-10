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
    title: '状态',
    dataIndex: 'status_zh',
  },
  {
    title: '外部网络',
    dataIndex: 'extrannet'
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'operation' }
  },
];
export default {
  namespaced: true,
  state: {
    handleRowData: {},
    columns,
    menuOptions: [
      { visible: false, type: 'none', name: '创建', id: 'create' },
      { visible: false, type: 'none', name: '删除', id: 'delete' },

      { visible: false, type: 'single', name: '修改',    id: 'edit' },
      { visible: false, type: 'single', name: '设置网关', id: 'gateway' },
      { visible: false, type: 'single', name: '清除网关', id: 'clearGateway' },
    ]
  },
  mutations: {},
  actions: {},
  getters: {}
};
