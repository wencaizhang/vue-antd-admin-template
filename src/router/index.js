import Vue from 'vue';
import Router from 'vue-router';

import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Login from '../views/User/Login.vue';
import BasicLayout from '@/components/Layout/BasicLayout';


Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/user/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/',
      name: 'Index',
      redirect: '/home',
      component: BasicLayout,
      children: [
        {
          path: 'home',
          name: 'Home',
          component: Home,
        },
        {
          path: 'about',
          name: 'About',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
        },
      ]
    },
    {
      path: '*', redirect: '/',
    }
  ],
});
