const columns = [
  {
    title: '名称',
    dataIndex: 'name'
  },
  {
    title: '创建时间',
    dataIndex: 'createDate',
    sorter: (a, b) => { return a.timestamp - b.timestamp },
  },
  {
    title: '加密方法',
    dataIndex: 'encryptionScheme'
  },
  // {
  //   title: '所属项目',
  //   dataIndex: 'subordinateProject'
  // },
  // {
  //   title: '操作',
  //   dataIndex: 'operation',
  //   scopedSlots: { customRender: 'operation' }
  // }
];
export default {
  namespaced: true,
  state: {
    lastCreatedKeyPair: {},
    columns,
    menuOptions: [
      { visible: false, type: 'none',   id: 'create',      name: '创建', },
      { visible: false, type: 'none',   id: 'import',      name: '导入', },
      { visible: false, type: 'batch',  id: 'batchDeleta', name: '删除', },
      // { visible: false, type: 'batch',  id: 'bindTags',    name: '绑定标签', },
      // TODO
      { visible: false, type: 'single', id: 'edit',        name: '修改', },
      { visible: false, type: 'none',   id: 'download',    name: '下载', },
    ],
  },
  mutations: {
    setLastCreatedKeyPair (state, payload) {
      state.lastCreatedKeyPair = payload;
    }
  },
  actions: {},
  getters: {}
};
