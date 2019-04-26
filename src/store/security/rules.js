const columns = [
  {
    title: '方向',
    dataIndex: 'direction'
  },
  {
    title: '以太网类型',
    dataIndex: 'etherType',
  },
  {
    title: 'IP协议',
    dataIndex: 'protocol',
  },
  {
    title: '端口范围',
    dataIndex: 'portScope',
  },
  {
    title: '远端IP前缀',
    dataIndex: 'remoteIpPrefix',
  },
  {
    title: '远端安全组',
    dataIndex: 'remoteGroupId',
  },
  {
    title: '操作',
    dataIndex: 'singleMenuOptions',
    scopedSlots: { customRender: 'operation' }
  }
];
export default {
  namespaced: true,
  state: {
    columns,
    menuOptions: [
      { visible: false, type: 'none',   id: 'create',      name: '创建', },
      { visible: false, type: 'none',   id: 'batchDeleta', name: '删除', },

      { visible: false, type: 'single', id: 'editRule',    name: '编辑规则', },
      { visible: false, type: 'single', id: 'editGroup',   name: '编辑安全组', },
      { visible: false, type: 'single', id: 'deleGroup',   name: '删除安全组', },
    ],
  },
  mutations: {

  },
  actions: {},
  getters: {}
};
