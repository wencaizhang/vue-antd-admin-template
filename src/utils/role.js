import Vue from 'vue';
import { constantRouterMap, asyncRouterMap, adminRoutermap } from "@/router/config";
import router from '@/router/index';
import store from '@/store/index';

export function clearToken () {
  Vue.ls.clear();
}

// export function addRoutes () {
//   const routerMap = getRouterMap();
//   router.addRoutes(routerMap);
// }

export function redirectToLogin (next) {
  const name = 'login';
  next ? next({ name }) : router.push({ name })
}
