import Login from "../views/User/Login.vue";

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
        name: "login"
        // component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: "register",
        name: "register"
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
    name: "Login",
    component: Login
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
            meta: { title: "SSH密钥对", permission: ["dashboard"] }
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
                name: "diskInstance",
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
                name: "shoot",
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
                name: "backup",
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
            meta: { title: "子网", permission: ["dashboard"] }
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
        path: "safety",
        name: "safety",
        component: RouteView,
        redirect: "safety/firewall",
        meta: { title: "安全", icon: "safety-certificate", permission: ["dashboard"] },
        children: [
          {
            path: "firewall",
            name: "firewall",
            component: () =>
              import(/* webpackChunkName: "expense" */ "@/views/Safety/Firewall/Container"),
            meta: { title: "防火墙", permission: ["dashboard"] }
          }
        ]
      },

      // 费用
      {
        path: "expense",
        name: "expense",
        component: RouteView,
        redirect: "expense/overview",
        meta: { title: "费用", icon: "pay-circle", permission: ["dashboard"] },
        children: [
          {
            path: "overview",
            name: "overview",
            component: () =>
              import(/* webpackChunkName: "expense" */ "@/views/Expense/Overview/Container"),
            meta: { title: "费用概览", permission: ["dashboard"] }
          },
          {
            path: "record",
            name: "record",
            component: () =>
              import(/* webpackChunkName: "expense" */ "@/views/Expense/Record/Container"),
            meta: { title: "充值记录", permission: ["dashboard"] }
          },
          {
            path: "order",
            name: "order",
            component: () =>
              import(/* webpackChunkName: "expense" */ "@/views/Expense/Order/Container"),
            meta: { title: "消费订单", permission: ["dashboard"] }
          },
          {
            path: "bill-detail",
            name: "bill-detail",
            component: () =>
              import(/* webpackChunkName: "expense" */ "@/views/Expense/BillDetail/Container"),
            meta: { title: "账单明细", permission: ["dashboard"] }
          }
        ]
      }
    ]
  },
  {
    path: "*",
    redirect: "/"
  }
];
