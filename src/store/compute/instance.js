const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    scopedSlots: { customRender: 'id' }
  },
  {
    title: '云主机名称',
    dataIndex: 'name'
  },
  {
    title: '状态',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' },
    // filters: [
    //   { text: '等待中', value: 'build' },
    //   { text: '运行中', value: 'active' },
    //   { text: '已暂停', value: 'paused' },
    //   { text: '已关机', value: 'shutoff' },
    //   { text: '已删除', value: 'deleted' },
    //   { text: '重启中', value: 'reboot' }
    // ],
    // filterMultiple: false,
  },
  // {
  //   title: '区域',
  //   dataIndex: 'availableDomains',
  //   // filters: [
  //   //   { text: '北京一区', value: '北京一区' },
  //   //   { text: '北京二区', value: '北京二区' }
  //   // ],
  //   // filterMultiple: false
  // },
  {
    title: '镜像',
    dataIndex: 'imageName'
  },
  {
    title: '规格',
    dataIndex: 'spec'
  },
  {
    title: '网络',
    dataIndex: 'network',
    scopedSlots: { customRender: 'network' }
  },
  {
    title: '公网IP',
    dataIndex: 'ipAddress',
    scopedSlots: { customRender: 'ipAddress' }
  },
  {
    title: '安全组',
    dataIndex: 'securityGroups',
    scopedSlots: { customRender: 'securityGroups' }
  },
  {
    title: '创建时间',
    dataIndex: 'createDate',
    sorter: (a, b) => { return a.timestamp - b.timestamp },
  },
  {
    title: '操作',
    dataIndex: 'singleMenuOptions',
    scopedSlots: { customRender: 'operation' }
  }
];

const allInstanceStatus = [
  'active',
  // 'build',  // 等待中禁止任何操作
  'paused',
  // 'reboot', // 重启中禁止任何操作
  'shutoff',
  // 'rebuild',  // 重建中禁止任何操作
  'suspended',
  'resize',
  'verify_resize',
  'revert_resize',
  'password',
  'hard_reboot',
  'deleted',
  'unknown',
  'error',
  'stopped',
];
export default {
  namespaced: true,
  state: {
    columns,

    // 只有当实例处于 availableStatus 中的状态时，对应的操作才可用
    menuOptions: [
      { visible: false, type: 'none',  name: '启动',   id: 'launch',      availableStatus: ['shutoff'] },
      { visible: false, type: 'none',  name: '关机',   id: 'shutdown',    availableStatus: ['active', ] },

      { visible: false, type: 'multi', name: '删除',   id: 'delete',      availableStatus: allInstanceStatus },
      { visible: false, type: 'multi', name: '重启',   id: 'restart',     availableStatus: ['active', ] },
      { visible: false, type: 'multi', name: '软重启', id: 'softRestart', availableStatus: ['active', ] },

      // { visible: false, type: 'none', name: '分配公网IP', id: 'allotIP' },
      { visible: false, type: 'single', name: '创建快照',   id: 'createSnapshot',  availableStatus: ['active', ] },
      { visible: false, type: 'single', name: '绑定公网IP', id: 'bindIP',           availableStatus: ['active', ] },
      { visible: false, type: 'single', name: '解绑公网IP', id: 'unbindIP',         availableStatus: ['active', 'shutoff', 'paused'] },
      { visible: false, type: 'single', name: '进入控制台', id: 'console',          availableStatus: [ 'active' ] },
      { visible: false, type: 'single', name: '重建云主机', id: 'rebuildCloudHost', availableStatus: ['active', ] },
      { visible: false, type: 'single', name: '编辑安全组', id: 'editSafetyGroup',  availableStatus: ['active', 'paused', ]},
      { visible: false, type: 'single', name: '删除云主机', id: 'deleteCloudHost',  availableStatus: ['active', 'shutoff', 'paused'] },
      { visible: false, type: 'single', name: '查看云主机概况', id: 'hostDetail',    availableStatus: ['active', ] }
    ]
  },
  mutations: {},
  actions: {},
  getters: {}
};
