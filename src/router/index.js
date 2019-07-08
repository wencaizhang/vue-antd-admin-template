import Vue from 'vue';
import Router from 'vue-router';
import VueWechatTitle from 'vue-wechat-title'

import Login from '../views/Account/Login.vue';
import Register from '../views/Account/Register.vue';

Vue.use(VueWechatTitle)
Vue.use(Router);

import asyncRouterMap from "./config";

/**
 * 基础路由
 */
const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    meta: { title: '登录' },
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    meta: { title: '注册新用户' },
    component: Register
  },
  {
    path: '/forget',
    name: 'forget',
    meta: { title: '忘记密码' },
    component: Register
  },
];


export default new Router({
  base: process.env.BASE_URL,
  routes: [...constantRouterMap, ...asyncRouterMap ]
})
