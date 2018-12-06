import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Login from "../views/User/Login.vue";

import RouteView from "@/components/Layout/RouteView";
import BasicLayout from "@/components/Layout/BasicLayout";
import Dashboard from "@/views/Dashboard/Container";

import Instance from "@/views/Compute/Instance";
import CreateInstance from "@/views/Compute/CreateInstance/Container";

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
        // component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
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
        component: Dashboard,
        meta: { title: "总览", icon: "dashboard", permission: ["dashboard"] }
      },

      // 计算
      {
        path: "compute",
        name: "compute",
        component: RouteView,
        meta: { title: "计算", icon: "dashboard", permission: ["dashboard"] },
        children: [
          {
            path: "instance",
            name: "instance",
            component: Instance,
            meta: { title: "实例", permission: ["dashboard"] }
          },
          {
            path: "create",
            name: "create",
            component: CreateInstance,
            meta: { title: "创建实例", permission: ["dashboard"] },
          },
          {
            path: "mirror",
            name: "mirror",
            component: Home,
            meta: { title: "镜像", permission: ["dashboard"] }
          },
          {
            path: "key-pair",
            name: "key-pair",
            component: Home,
            meta: { title: "密钥对", permission: ["dashboard"] }
          }
        ]
      },
      // 网络
      {
        path: "network",
        name: "network",
        component: RouteView,
        meta: { title: "网络", icon: "dashboard", permission: ["dashboard"] },
        children: [
          {
            path: "route",
            name: "route",
            component: Home,
            meta: { title: "路由器", permission: ["dashboard"] }
          },
          {
            path: "subnet",
            name: "subnet",
            component: Home,
            meta: { title: "子网", permission: ["dashboard"] }
          },
          {
            path: "ip",
            name: "ip",
            component: Home,
            meta: { title: "公网IP", permission: ["dashboard"] }
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
