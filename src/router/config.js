import Login from "../views/User/Account/Login.vue";
import Register from "../views/User/Account/Register.vue";

import RouteView from "@/components/Layout/RouteView";
import BasicLayout from "@/components/Layout/BasicLayout";

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: "/user",
    // component: UserLayout,
    redirect: "/user/login",
    hidden: true,
    children: [
      {
        path: "login",
        name: "login",
        meta: { title: "登录" },
        // component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: "register",
        name: "register",
        meta: { title: "注册" },
        // component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: "register-result",
        name: "registerResult"
        // component: () => import(/* webpackChunkName: "user" */ '/views/user/RegisterResult')
      }
    ]
  },

  {
    path: "/404"
    // component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
];

export const asyncRouterMap = [
  {
    path: "/login",
    name: "login",
    meta: { title: "登录" },
    component: Login
  },
  {
    path: "/register",
    name: "register",
    meta: { title: "注册新用户" },
    component: Register
  },
  {
    path: "/forget",
    name: "forget",
    meta: { title: "忘记密码" },
    component: Register
  },
  {
    path: "/",
    name: "Index",
    meta: { title: "首页" },
    redirect: "/dashboard",
    component: BasicLayout,
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import(/* webpackChunkName: "dashboard" */ "@/views/Dashboard/Container"),
        meta: { title: "总览", icon: "dashboard", permission: ["dashboard"] }
      },

      // 计算
      {
        path: "compute",
        name: "compute",
        component: RouteView,
        redirect: "compute/instance",
        meta: { title: "计算", icon: "calculator", permission: ["dashboard"] },
        children: [
          {
            path: "instance",
            name: "instance",
            component: () =>
              import(/* webpackChunkName: "compute" */ "@/views/Compute/Instance/Container"),
            meta: { title: "实例", permission: ["dashboard"] }
          },
          {
            path: "instance/create",
            name: "CreateInstance",
            hidden: true,
            component: () =>
              import(/* webpackChunkName: "compute" */ "@/views/Compute/CreateInstance/Container"),
            meta: { title: "创建实例", permission: ["dashboard"] }
          },
          {
            path: "mirror",
            name: "mirror",
            component: () =>
              import(/* webpackChunkName: "compute" */ "@/views/Compute/Mirror/Container"),
            meta: { title: "镜像", permission: ["dashboard"] }
          },
          {
            path: "key-pair",
            name: "key-pair",
            component: () =>
              import(/* webpackChunkName: "compute" */ "@/views/Compute/KeyPair/Container"),
            meta: { title: "密钥对", permission: ["dashboard"] }
          }
        ]
      },

      // 存储
      {
        path: "store",
        name: "store",
        component: RouteView,
        redirect: "store/harddisk",
        meta: { title: "存储", icon: "save", permission: ["dashboard"] },
        children: [
          {
            path: "harddisk",
            name: "harddisk",
            component: () =>
              import(/* webpackChunkName: "store" */ "@/views/Store/HardDisk/Container"),
            meta: { title: "硬盘", permission: ["dashboard"] },
            children: [
              {
                path: ":id",
                name: "disk-instance",
                hidden: true,
                component: () =>
                  import(/* webpackChunkName: "store" */ "@/views/Store/HardDisk/Detail"),
                meta: { title: "硬盘", permission: ["dashboard"] }
              }
            ]
          },

          {
            path: "snapshoot",
            name: "snapshoot",
            component: () =>
              import(/* webpackChunkName: "store" */ "@/views/Store/Snapshoot/Container"),
            meta: { title: "快照", permission: ["dashboard"] },
            children: [
              {
                path: ":id",
                name: "snapshoot-instance",
                hidden: true,
                component: () =>
                  import(/* webpackChunkName: "store" */ "@/views/Store/Snapshoot/Detail"),
                meta: { title: "快照", permission: ["dashboard"] }
              }
            ]
          },
          {
            path: "backups",
            name: "backups",
            component: () =>
              import(/* webpackChunkName: "store" */ "@/views/Store/Backups/Container"),
            meta: { title: "备份", permission: ["dashboard"] },
            children: [
              {
                path: ":id",
                name: "backups-instance",
                hidden: true,
                component: () =>
                  import(/* webpackChunkName: "store" */ "@/views/Store/Backups/Detail"),
                meta: { title: "备份", permission: ["dashboard"] }
              }
            ]
          }
        ]
      },
      // 网络
      {
        path: "network",
        name: "network",
        component: RouteView,
        redirect: "network/router",
        meta: { title: "网络", icon: "wifi", permission: ["dashboard"] },
        children: [
          {
            path: "router",
            name: "router",
            component: () =>
              import(/* webpackChunkName: "network" */ "@/views/Network/Router/Container"),
            meta: { title: "路由器", permission: ["dashboard"] }
          },
          {
            path: "subnet",
            name: "subnet",
            component: () =>
              import(/* webpackChunkName: "network" */ "@/views/Network/Subnet/Container"),
            meta: { title: "网络", permission: ["dashboard"] }
          },
          {
            path: "ip",
            name: "ip",
            component: () =>
              import(/* webpackChunkName: "network" */ "@/views/Network/IP/Container"),
            meta: { title: "公网IP", permission: ["dashboard"] }
          }
        ]
      },

      // 安全
      {
        path: "security",
        name: "security",
        component: RouteView,
        redirect: "security/group",
        meta: { title: "安全", icon: "safety-certificate", permission: ["dashboard"] },
        children: [
          {
            path: "group",
            name: "group",
            component: () =>
              import(/* webpackChunkName: "expense" */ "@/views/Security/Group/Container"),
            meta: { title: "安全组", permission: ["dashboard"] },
            children: [
              {
                path: "rules/:id",
                name: "rules",
                hidden: true,
                component: () =>
                  import(/* webpackChunkName: "expense" */ "@/views/Security/Rules/Container"),
                meta: { title: "管理安全组规则", permission: ["dashboard"] }
              },
            ]
          },

        ]
      },

      // 用户
      {
        path: "user",
        name: "user",
        component: RouteView,
        redirect: "user/info",
        meta: { title: "用户", icon: "user", permission: ["dashboard"] },
        children: [
          {
            path: "info",
            name: "info",
            redirect: "info/basic",
            component: () =>
              import(/* webpackChunkName: "user" */ "@/views/User/Base/Container"),
            meta: { title: "用户管理", permission: ["dashboard"] },
            children: [
              {
                path: "basic",
                name: "basic",
                hidden: true,
                component: () =>
                  import(/* webpackChunkName: "user" */ "@/views/User/Base/comm/basic"),
                  meta: { title: "基本信息", permission: ["dashboard"] },
              },
              {
                path: "security",
                name: "security-setting",
                hidden: true,
                component: () =>
                  import(/* webpackChunkName: "user" */ "@/views/User/Base/comm/security"),
                  meta: { title: "安全认证", permission: ["dashboard"] },
              },
              {
                path: "auth",
                name: "auth",
                hidden: true,
                component: () =>
                  import(/* webpackChunkName: "user" */ "@/views/User/Base/comm/AuthContainer"),
                  meta: { title: "认证信息", permission: ["dashboard"] },
              },
            ],
          },
          {
            path: "order",
            name: "user-order",
            component: () =>
              import(/* webpackChunkName: "user" */ "@/views/User/Order/Container"),
              meta: { title: "工单管理", permission: ["dashboard"] },
          },
        ]
      },
      // 管理员
      {
        path: "admin",
        name: "admin",
        component: RouteView,
        redirect: "admin/order",
        meta: { title: "管理员", icon: "user-add", permission: ["dashboard"] },
        children: [
          {
            path: "order",
            name: "admin-order",
            component: () =>
              import(/* webpackChunkName: "admin" */ "@/views/User/Order/Container"),
              meta: { title: "工单管理", permission: ["dashboard"] },
          },
        ]
      },
    ]
  },
  {
    path: "*",
    redirect: "/"
  }
];
