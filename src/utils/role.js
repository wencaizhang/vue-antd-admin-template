import Vue from 'vue';
import { asyncRouterMap, adminRouterMap } from "@/router/config";
import router from '@/router/index';

export function clearToken () {
  Vue.ls.clear();
}

export function addRoutes () {
  const isUser = Vue.ls.get('isUser');
  const routerMap = isUser ? asyncRouterMap : adminRouterMap;
  router.addRoutes(routerMap);
}

export function redirectToLogin (next) {
  const isUser = Vue.ls.get('isUser');
  const name = isUser ? 'login' : 'admin-login';
  next ? next({ name }) : router.push({ name })
}