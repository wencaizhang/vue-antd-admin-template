// import { UserLayout, BasicLayout, RouteView, PageView } from '@/components/layouts'
// const { UserLayout, BasicLayout, RouteView, PageView } = {}


export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    // component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard/workplace',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        // component: RouteView,
        meta: { title: '仪表盘', icon: 'dashboard', permission: [ 'dashboard' ] },
        children: [
          {
            path: '/dashboard/analysis',
            name: 'Analysis',
            // component: () => import('@/views/dashboard/Analysis'),
            meta: { title: '分析页', permission: [ 'dashboard' ] }
          },
          {
            path: '/dashboard/monitor',
            name: 'Monitor',
            hidden: true,
            // component: () => import('@/views/dashboard/Monitor'),
            meta: { title: '监控页', permission: [ 'dashboard' ] }
          },
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            // component: () => import('@/views/dashboard/Workplace'),
            meta: { title: '工作台', permission: [ 'dashboard' ] }
          }
        ]
      },

      // forms
      {
        path: '/form',
        redirect: '/form/basic-form',
        // component: PageView,
        meta: { title: '表单页', icon: 'form', permission: [ 'form' ] },
        children: [
          {
            path: '/form/base-form',
            name: 'BaseForm',
            // component: () => import('@/views/form/BasicForm'),
            meta: { title: '基础表单', permission: [ 'form' ] }
          },
          {
            path: '/form/step-form',
            name: 'StepForm',
            // component: () => import('@/views/form/stepForm/StepForm'),
            meta: { title: '分步表单', permission: [ 'form' ] }
          },
          {
            path: '/form/advanced-form',
            name: 'AdvanceForm',
            // component: () => import('@/views/form/advancedForm/AdvancedForm'),
            meta: { title: '高级表单', permission: [ 'form' ] }
          }
        ]
      },

      // list
      {
        path: '/list',
        name: 'list',
        // component: PageView,
        redirect: '/list/query-list',
        meta: { title: '列表页', icon: 'table', permission: [ 'table' ] },
        children: [
          {
            path: '/list/query-list',
            name: 'QueryList',
            // component: () => import('@/views/list/TableList'),
            meta: { title: '查询表格', permission: [ 'table' ] }
          },
          {
            path: '/list/role-list',
            name: 'RoleList',
            // component: () => import('@/views/list/RoleList'),
            meta: { title: '角色列表', permission: [ 'table' ] }
          },
          {
            path: '/list/search',
            name: 'SearchList',
            // component: () => import('@/views/list/search/SearchLayout'),
            redirect: '/list/search/article',
            meta: { title: '搜索列表', permission: [ 'table' ] },
            children: [
              {
                path: '/list/search/article',
                name: 'SearchArticles',
                // component: () => import('../views/list/TableList'),
                meta: { title: '搜索列表（文章）', permission: [ 'table' ] }
              },
              {
                path: '/list/search/project',
                name: 'SearchProjects',
                // component: () => import('../views/list/TableList'),
                meta: { title: '搜索列表（项目）', permission: [ 'table' ] }
              },
              {
                path: '/list/search/application',
                name: 'SearchApplications',
                // component: () => import('../views/list/TableList'),
                meta: { title: '搜索列表（应用）', permission: [ 'table' ] }
              },
            ]
          },
        ]
      },

    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    // component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        // component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        // component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        // component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      }
    ]
  },

  {
    path: '/404',
    // component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  },

]
