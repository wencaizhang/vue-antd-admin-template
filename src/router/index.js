import Vue from 'vue';
import Router from 'vue-router';
import VueWechatTitle from 'vue-wechat-title'

Vue.use(VueWechatTitle)
Vue.use(Router);

import { arr, constantRouterMap, asyncRouterMap } from "./config";

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: asyncRouterMap
})
