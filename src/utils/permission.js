import Vue from 'vue'
import NProgress from 'nprogress'  // 顶部进度条
import 'nprogress/nprogress.css'
import router from '../router'
import { redirectToLogin } from '@/utils/role'
import { ACCESS_TOKEN } from '@/store/mutation-types'
NProgress.configure({ showSpinner: false })// NProgress Configuration

import settings from '@/utils/settings'
// 免登录白名单
const whiteList = settings.whiteList;

router.beforeEach((to, from, next) => {
  console.log(to.name, from.name);
  NProgress.start();
  // 未登录
  if (!Vue.ls.get(ACCESS_TOKEN)) {
    if (whiteList.includes(to.name)) {
      next()
    } else {
      redirectToLogin(next)
      NProgress.done()
    }
    return false;
  }

  // 已经登录，且目标路径是登录页，重定向到首页
  if (to.name === 'login') {
    next({ name: 'Index' })
    NProgress.done()
    return false;
  }

  // // 未认证拦截
  // const authed = false;
  // if (!authed) {
  //   const toNames = to.matched.map(item => item.name);
  //   const fromNames = from.matched.map(item => item.name);

  //   // to user 不拦截
  //   if (toNames[1] === 'user') {
  //     console.log('111111')
  //     next();
  //     return false;
  //   }
  //   // 从登录页面进入
  //   else if (whiteList.includes(from.name)) {
  //     console.log('222222')
  //     next({ name: 'user' });
  //     NProgress.done();
  //     return false;
  //   }
  //   else {
  //     console.log('333333')
  //     toNames.length ? next(false) : next({ name: 'user' });
  //     NProgress.done();
  //     return false;
  //   }
  // }

  // 正常情况下跳转
  next()
})

router.afterEach(() => {
  NProgress.done()
})

