const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    scopedSlots: { customRender: 'detail' }
  },
  {
    title: '名称',
    dataIndex: 'name'
  },
  {
    title: '类型',
    dataIndex: 'imageType_zh'
  },
  {
    title: '状态',
    dataIndex: 'status_zh',
  },
  {
    title: '磁盘类型',
    dataIndex: 'imageFormat_zh'
  },
  {
    title: '容量（G)',
    dataIndex: 'capacity'
  },
  {
    title: '平台',
    dataIndex: 'platform'
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
    menuOptions: [
      { visible: false, type: 'none',  name: '创建镜像',   id: 'create', },
      { visible: false, type: 'none',  name: '详情',   id: 'detail', },

      { visible: false, type: 'single', name: '编辑镜像',   id: 'edit',  },
      { visible: false, type: 'single', name: '删除镜像',   id: 'delete', },
      { visible: false, type: 'single', name: '更新元数据', id: 'update', },
    ]
  },
  mutations: {},
  actions: {},
  getters: {}
};
