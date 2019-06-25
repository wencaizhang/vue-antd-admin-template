import Vue from 'vue';
import { asyncRouterMap, adminRouterMap } from "@/router/config";
import router from '@/router/index';
import store from '@/store/index';

export function clearToken () {
  Vue.ls.clear();
}

export function addRoutes () {
  const routerMap = getRouterMap();
  router.addRoutes(routerMap);
}

export function redirectToLogin (next) {
  const isUser = Vue.ls.get('isUser');
  const name = isUser ? 'login' : 'admin-login';
  next ? next({ name }) : router.push({ name })
}

export function getRouterMap () {
  console.log(store)
  const isUser = Vue.ls.get('isUser');
  const routerMap = isUser ? asyncRouterMap : adminRouterMap;
  return routerMap;

  const role = store.state.app.role;
  if (role === 'user') {
    return asyncRouterMap;
  }
  if (role === 'admin') {
    return adminRouterMap;
  }
}