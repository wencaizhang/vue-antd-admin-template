import Vue from 'vue';
import Router from 'vue-router';



import { arr, constantRouterMap, asyncRouterMap } from "./config";

Vue.use(Router);

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: asyncRouterMap
})