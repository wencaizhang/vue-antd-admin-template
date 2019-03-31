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
    dataIndex: 'status_zh',
    scopedSlots: { customRender: 'status' }
    // filters: [
    //   { text: '等待中', value: '等待中' },
    //   { text: '运行中', value: '运行中' },
    //   { text: '已暂停', value: '已暂停' },
    //   { text: '已关闭', value: '已关闭' },
    //   { text: '已删除', value: '已删除' },
    //   { text: '重启中', value: '重启中' }
    // ],
    // filterMultiple: false
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
    dataIndex: 'ipAddress'
  },
  {
    title: '安全组',
    dataIndex: 'secuGroupString'
  },
  {
    title: '创建时间',
    dataIndex: 'createDate'
  },
  {
    title: '操作',
    dataIndex: 'singleMenuOptions',
    scopedSlots: { customRender: 'operation' }
  }
];

const allInstanceStatus = [
  'ACTIVE',
  // 'BUILD',  // 等待中禁止任何操作
  'PAUSED',
  // 'REBOOT', // 重启中禁止任何操作 
  'SHUTOFF',
  'REBUILD',
  'SUSPENDED',
  'RESIZE',
  'VERIFY_RESIZE',
  'REVERT_RESIZE',
  'PASSWORD',
  'HARD_REBOOT',
  'DELETED',
  'UNKNOWN',
  'ERROR',
  'STOPPED', 
];
export default {
  namespaced: true,
  state: {
    handleRowData: {},
    columns,

    // 只有当实例处于 availableStatus 中的状态时，对应的操作才可用
    // availableStatus 为 true：任何状态都可用，反之任何状态都不可用
    menuOptions: [
      { visible: false, type: 'none',  name: '启动',   id: 'launch',      availableStatus: ['SHUTOFF'] },
      { visible: false, type: 'none',  name: '关机',   id: 'shutdown',    availableStatus: ['ACTIVE', ] },

      { visible: false, type: 'batch', name: '删除',   id: 'delete',      availableStatus: allInstanceStatus },
      { visible: false, type: 'batch', name: '重启',   id: 'restart',     availableStatus: ['ACTIVE', ] },
      { visible: false, type: 'batch', name: '软重启', id: 'softRestart', availableStatus: ['ACTIVE', ] },

      // { visible: false, type: 'none', name: '分配公网IP', id: 'allotIP' },
      { visible: false, type: 'single', name: '创建快照',   id: 'createSnapshoot',  availableStatus: ['ACTIVE', ] },
      { visible: false, type: 'single', name: '绑定公网IP', id: 'bindIP',           availableStatus: ['ACTIVE', ] },
      { visible: false, type: 'single', name: '解绑公网IP', id: 'unbindIP',         availableStatus: ['ACTIVE', 'SHUTOFF', 'PAUSED'] },
      { visible: false, type: 'single', name: '进入控制台', id: 'console',          availableStatus: [ 'ACTIVE' ] },
      { visible: false, type: 'single', name: '重建云主机', id: 'rebuildCloudHost', availableStatus: ['ACTIVE', ] },
      { visible: false, type: 'single', name: '编辑安全组', id: 'editSafetyGroup',  availableStatus: ['ACTIVE', 'PAUSED', ]},
      { visible: false, type: 'single', name: '删除云主机', id: 'deleteCloudHost',  availableStatus: ['ACTIVE', 'SHUTOFF', 'PAUSED'] },
      { visible: false, type: 'single', name: '查看云主机概况', id: 'hostDetail',    availableStatus: ['ACTIVE', ] }
    ]
  },
  mutations: {},
  actions: {},
  getters: {}
};
