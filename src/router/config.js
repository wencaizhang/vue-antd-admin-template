
import RouteView from '@/components/Layout/RouteView';
import BasicLayout from '@/components/Layout/BasicLayout';

export default [
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
        meta: { title: '管理员', icon: 'user-add', role: ['admin'] },
        children: [
          {
            path: 'auth',
            name: 'auth',
            component: () =>
              import(/* webpackChunkName: 'admin' */ '@/views/Admin/Auth/Container'),
            meta: { title: '身份认证审核', role: ['admin', 'superAdmin'] },
          },
          // {
          //   path: 'order',
          //   name: 'order',
          //   component: () =>
          //     import(/* webpackChunkName: 'admin' */ '@/views/Admin/Order/Container'),
          //   meta: { title: '工单管理', role: ['admin', 'superAdmin'] },
          // },
          // {
          //   path: 'auditors',
          //   name: 'auditors',
          //   component: () =>
          //     import(/* webpackChunkName: 'admin' */ '@/views/Admin/Auditors/Container'),
          //   meta: { title: '审核人员', role: ['superAdmin'] },
          // },
        ]
      },
    ]
  }
];
