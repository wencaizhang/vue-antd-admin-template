import Login from '../views/User/Account/Login.vue';
import Register from '../views/User/Account/Register.vue';

import RouteView from '@/components/Layout/RouteView';
import BasicLayout from '@/components/Layout/BasicLayout';

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    meta: { title: '登录' },
    component: Login
  },
  {
    path: '/admin-login',
    name: 'admin-login',
    meta: { title: '登录' },
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    meta: { title: '注册新用户' },
    component: Register
  },
  {
    path: '/forget',
    name: 'forget',
    meta: { title: '忘记密码' },
    component: Register
  },
];

export const adminRouterMap = [
  {
    path: '/',
    name: 'Index',
    meta: { title: '首页' },
    redirect: '/admin',
    component: BasicLayout,
    children: [
      // 管理员
      {
        path: 'admin',
        name: 'admin',
        component: RouteView,
        redirect: 'admin/auth',
        meta: { title: '管理员', icon: 'user-add', permission: ['admin'] },
        children: [
          {
            path: 'auth',
            name: 'admin-auth',
            component: () =>
              import(/* webpackChunkName: 'admin' */ '@/views/User/Auth/Container'),
            meta: { title: '身份认证审核', permission: ['admin'] },
          },
          {
            path: 'order',
            name: 'admin-order',
            component: () =>
              import(/* webpackChunkName: 'admin' */ '@/views/User/Order/Container'),
            meta: { title: '工单管理', permission: ['admin'] },
          },
          {
            path: 'auditors',
            name: 'auditors',
            component: () =>
              import(/* webpackChunkName: 'admin' */ '@/views/User/Auditors/Container'),
            meta: { title: '审核人员', permission: ['admin'] },
          },
        ]
      },
    ]
  }
]

export const asyncRouterMap = [
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
        meta: { title: '总览', icon: 'dashboard', permission: ['user'] }
      },

      // 计算
      {
        path: 'compute',
        name: 'compute',
        component: RouteView,
        redirect: 'compute/instance',
        meta: { title: '计算', icon: 'calculator', permission: ['user'] },
        children: [
          {
            path: 'instance',
            name: 'instance',
            component: () =>
              import(/* webpackChunkName: 'compute' */ '@/views/Compute/Instance/Container'),
            meta: { title: '实例', permission: ['user'] }
          },
          {
            path: 'instance/create',
            name: 'CreateInstance',
            hidden: true,
            component: () =>
              import(/* webpackChunkName: 'compute' */ '@/views/Compute/CreateInstance/Container'),
            meta: { title: '创建实例', permission: ['user'] }
          },
          {
            path: 'mirror',
            name: 'mirror',
            component: () =>
              import(/* webpackChunkName: 'compute' */ '@/views/Compute/Mirror/Container'),
            meta: { title: '镜像', permission: ['user'] }
          },
          {
            path: 'key-pair',
            name: 'key-pair',
            component: () =>
              import(/* webpackChunkName: 'compute' */ '@/views/Compute/KeyPair/Container'),
            meta: { title: '密钥对', permission: ['user'] }
          }
        ]
      },

      // 存储
      {
        path: 'store',
        name: 'store',
        component: RouteView,
        redirect: 'store/harddisk',
        meta: { title: '存储', icon: 'save', permission: ['user'] },
        children: [
          {
            path: 'harddisk',
            name: 'harddisk',
            component: () =>
              import(/* webpackChunkName: 'store' */ '@/views/Store/HardDisk/Container'),
            meta: { title: '硬盘', permission: ['user'] },
            children: [
              {
                path: ':id',
                name: 'disk-instance',
                hidden: true,
                component: () =>
                  import(/* webpackChunkName: 'store' */ '@/views/Store/HardDisk/Detail'),
                meta: { title: '硬盘', permission: ['user'] }
              }
            ]
          },

          {
            path: 'snapshoot',
            name: 'snapshoot',
            component: () =>
              import(/* webpackChunkName: 'store' */ '@/views/Store/Snapshoot/Container'),
            meta: { title: '快照', permission: ['user'] },
            children: [
              {
                path: ':id',
                name: 'snapshoot-instance',
                hidden: true,
                component: () =>
                  import(/* webpackChunkName: 'store' */ '@/views/Store/Snapshoot/Detail'),
                meta: { title: '快照', permission: ['user'] }
              }
            ]
          },
          {
            path: 'backups',
            name: 'backups',
            component: () =>
              import(/* webpackChunkName: 'store' */ '@/views/Store/Backups/Container'),
            meta: { title: '备份', permission: ['user'] },
            children: [
              {
                path: ':id',
                name: 'backups-instance',
                hidden: true,
                component: () =>
                  import(/* webpackChunkName: 'store' */ '@/views/Store/Backups/Detail'),
                meta: { title: '备份', permission: ['user'] }
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
        meta: { title: '网络', icon: 'wifi', permission: ['user'] },
        children: [
          {
            path: 'router',
            name: 'router',
            component: () =>
              import(/* webpackChunkName: 'network' */ '@/views/Network/Router/Container'),
            meta: { title: '路由器', permission: ['user'] }
          },
          {
            path: 'subnet',
            name: 'subnet',
            component: () =>
              import(/* webpackChunkName: 'network' */ '@/views/Network/Subnet/Container'),
            meta: { title: '网络', permission: ['user'] }
          },
          {
            path: 'ip',
            name: 'ip',
            component: () =>
              import(/* webpackChunkName: 'network' */ '@/views/Network/IP/Container'),
            meta: { title: '公网IP', permission: ['user'] }
          }
        ]
      },

      // 安全
      {
        path: 'security',
        name: 'security',
        component: RouteView,
        redirect: 'security/group',
        meta: { title: '安全', icon: 'safety-certificate', permission: ['user'] },
        children: [
          {
            path: 'group',
            name: 'group',
            component: () =>
              import(/* webpackChunkName: 'expense' */ '@/views/Security/Group/Container'),
            meta: { title: '安全组', permission: ['user'] },
            children: [
              {
                path: 'rules/:id',
                name: 'rules',
                hidden: true,
                component: () =>
                  import(/* webpackChunkName: 'expense' */ '@/views/Security/Rules/Container'),
                meta: { title: '管理安全组规则', permission: ['user'] }
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
        redirect: 'user/info',
        meta: { title: '用户', icon: 'user', permission: ['user'] },
        children: [
          {
            path: 'info',
            name: 'info',
            redirect: 'info/basic',
            component: () =>
              import(/* webpackChunkName: 'user' */ '@/views/User/Base/Container'),
            meta: { title: '用户中心', permission: ['user'] },
            children: [
              {
                path: 'basic',
                name: 'basic',
                hidden: true,
                component: () =>
                  import(/* webpackChunkName: 'user' */ '@/views/User/Base/comm/basic'),
                meta: { title: '基本信息', permission: ['user'] },
              },
              {
                path: 'security',
                name: 'security-setting',
                hidden: true,
                component: () =>
                  import(/* webpackChunkName: 'user' */ '@/views/User/Base/comm/security'),
                meta: { title: '安全认证', permission: ['user'] },
              },
              {
                path: 'auth',
                name: 'auth',
                hidden: true,
                component: () =>
                  import(/* webpackChunkName: 'user' */ '@/views/User/Base/comm/AuthContainer'),
                meta: { title: '认证信息', permission: ['user'] },
              },
            ],
          },
          {
            path: 'order',
            name: 'user-order',
            component: () =>
              import(/* webpackChunkName: 'user' */ '@/views/User/Order/Container'),
            meta: { title: '工单管理', permission: ['user'] },
          },
        ]
      },
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
];
