import Vue from 'vue';
import Router from 'vue-router';
import VueWechatTitle from 'vue-wechat-title'

Vue.use(VueWechatTitle)
Vue.use(Router);

import { constantRouterMap, adminRouterMap, asyncRouterMap } from "./config";

export default new Router({
  base: process.env.BASE_URL,
  routes: [...constantRouterMap, ]
})
