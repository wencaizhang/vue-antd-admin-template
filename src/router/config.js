
import RouteView from '@/components/Layout/RouteView';
import BasicLayout from '@/components/Layout/BasicLayout';

export default [
  {
    path: '/',
    name: 'Index',
    meta: { title: '首页' },
    redirect: '/dashboard',
    component: BasicLayout,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import(/* webpackChunkName: 'dashboard' */ '@/views/Dashboard/Container'),
        meta: { title: '总览', icon: 'dashboard', role: ['user'], permission: [ 'authed' ] }
      },

      // 计算
      {
        path: 'compute',
        name: 'compute',
        component: RouteView,
        redirect: 'compute/instance',
        meta: { title: '计算', icon: 'calculator', role: ['user'], permission: [ 'authed' ] },
        children: [
          {
            path: 'instance',
            name: 'instance',
            component: () =>
              import(/* webpackChunkName: 'compute' */ '@/views/Compute/Instance/Container'),
            meta: { title: '实例', role: ['user'], permission: [ 'authed' ] }
          },
          {
            path: 'instance/create',
            name: 'CreateInstance',
            hidden: true,
            component: () =>
              import(/* webpackChunkName: 'compute' */ '@/views/Compute/CreateInstance/Container'),
            meta: { title: '创建实例', role: ['user'], permission: [ 'authed' ] }
          },
          {
            path: 'mirror',
            name: 'mirror',
            component: () =>
              import(/* webpackChunkName: 'compute' */ '@/views/Compute/Mirror/Container'),
            meta: { title: '镜像', role: ['user'], permission: [ 'authed' ] }
          },
          {
            path: 'key-pair',
            name: 'key-pair',
            component: () =>
              import(/* webpackChunkName: 'compute' */ '@/views/Compute/KeyPair/Container'),
            meta: { title: '密钥对', role: ['user'], permission: [ 'authed' ] }
          }
        ]
      },

      // 存储
      {
        path: 'store',
        name: 'store',
        component: RouteView,
        redirect: 'store/harddisk',
        meta: { title: '存储', icon: 'save', role: ['user'], permission: [ 'authed' ] },
        children: [
          {
            path: 'harddisk',
            name: 'harddisk',
            component: () =>
              import(/* webpackChunkName: 'store' */ '@/views/Store/HardDisk/Container'),
            meta: { title: '硬盘', role: ['user'], permission: [ 'authed' ] },
            children: [
              {
                path: ':id',
                name: 'disk-instance',
                hidden: true,
                component: () =>
                  import(/* webpackChunkName: 'store' */ '@/views/Store/HardDisk/Detail'),
                meta: { title: '硬盘', role: ['user'], permission: [ 'authed' ] }
              }
            ]
          },

          {
            path: 'snapshot',
            name: 'snapshot',
            component: () =>
              import(/* webpackChunkName: 'store' */ '@/views/Store/Snapshot/Container'),
            meta: { title: '快照', role: ['user'], permission: [ 'authed' ] },
            children: [
              {
                path: ':id',
                name: 'snapshot-instance',
                hidden: true,
                component: () =>
                  import(/* webpackChunkName: 'store' */ '@/views/Store/Snapshot/Detail'),
                meta: { title: '快照', role: ['user'], permission: [ 'authed' ] }
              }
            ]
          },
          {
            path: 'backups',
            name: 'backups',
            component: () =>
              import(/* webpackChunkName: 'store' */ '@/views/Store/Backups/Container'),
            meta: { title: '备份', role: ['user'], permission: [ 'authed' ] },
            children: [
              {
                path: ':id',
                name: 'backups-instance',
                hidden: true,
                component: () =>
                  import(/* webpackChunkName: 'store' */ '@/views/Store/Backups/Detail'),
                meta: { title: '备份', role: ['user'], permission: [ 'authed' ] }
              }
            ]
          }
        ]
      },
      // 网络
      {
        path: 'network',
        name: 'network',
        component: RouteView,
        redirect: 'network/router',
        meta: { title: '网络', icon: 'wifi', role: ['user'], permission: [ 'authed' ] },
        children: [
          {
            path: 'router',
            name: 'router',
            component: () =>
              import(/* webpackChunkName: 'network' */ '@/views/Network/Router/Container'),
            meta: { title: '路由器', role: ['user'], permission: [ 'authed' ] }
          },
          {
            path: 'subnet',
            name: 'subnet',
            component: () =>
              import(/* webpackChunkName: 'network' */ '@/views/Network/Subnet/Container'),
            meta: { title: '网络', role: ['user'], permission: [ 'authed' ] }
          },
          {
            path: 'ip',
            name: 'ip',
            component: () =>
              import(/* webpackChunkName: 'network' */ '@/views/Network/IP/Container'),
            meta: { title: '公网IP', role: ['user'], permission: [ 'authed' ] }
          }
        ]
      },

      // 安全
      {
        path: 'security',
        name: 'security',
        component: RouteView,
        redirect: 'security/group',
        meta: { title: '安全', icon: 'safety-certificate', role: ['user'], permission: [ 'authed' ] },
        children: [
          {
            path: 'group',
            name: 'group',
            component: () =>
              import(/* webpackChunkName: 'expense' */ '@/views/Security/Group/Container'),
            meta: { title: '安全组', role: ['user'], permission: [ 'authed' ] },
            children: [
              {
                path: 'rules/:id',
                name: 'rules',
                hidden: true,
                component: () =>
                  import(/* webpackChunkName: 'expense' */ '@/views/Security/Rules/Container'),
                meta: { title: '管理安全组规则', role: ['user'], permission: [ 'authed' ] }
              },
            ]
          },

        ]
      },

      // 用户
      {
        path: 'user',
        name: 'user',
        component: RouteView,
        redirect: 'user/basic',
        meta: { title: '用户', icon: 'user', role: ['user'], permission: [ 'authed' ] },
        children: [
          {
            path: 'auth',
            name: 'auth',
            component: () =>
              import(/* webpackChunkName: 'user' */ '@/views/User/Auth/Container'),
            meta: { title: '实名认证', role: ['user'], permission: [  ] },
          },
          {
            path: 'basic',
            name: 'basic',
            component: () =>
              import(/* webpackChunkName: 'user' */ '@/views/User/Basic'),
            meta: { title: '基本资料', role: ['user'], permission: [ 'authed' ] },
          },
          {
            path: 'security',
            name: 'security-setting',
            component: () =>
              import(/* webpackChunkName: 'user' */ '@/views/User/Security/Container'),
            meta: { title: '安全设置', role: ['user'], permission: [ 'authed' ] },
          },
        ],
      },
      {
        path: 'order',
        name: 'order',
        component: () =>
          import(/* webpackChunkName: 'user' */ '@/views/Order/Container'),
        meta: { title: '工单管理', icon: 'file-text', role: ['user'], permission: [ 'authed' ] },
      },
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
];
