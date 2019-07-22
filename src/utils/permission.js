import Vue from 'vue'
import NProgress from 'nprogress'  // 顶部进度条
import 'nprogress/nprogress.css'
import router from '../router'
import store from '../store'

import { LOGINFO } from "@/store/mutation-types";
NProgress.configure({ showSpinner: false })// NProgress Configuration

import { whiteList } from '@/utils/settings'

router.beforeEach((to, from, next) => {
  // console.log(to.name, from.name);
  NProgress.start();
  // 如果未登录
  if (!Vue.ls.get(LOGINFO)) {
    if (whiteList.includes(to.name)) {
      next()
    } else {
      router.push({ name: 'login' })
      NProgress.done()
    }
    return false;
  }

  // 如果已登录，且目标路径是登录页，重定向到首页
  if (to.name === 'login') {
    next({ name: 'Index' })
    NProgress.done()
    return false;
  }
  
  authPermission(to, from, next);
})

router.afterEach(() => {
  NProgress.done()
})

function authPermission (to, from, next) {
  const authStatus = store.state.app.authStatus;

  // 2,3分别是个人认证成功，企业认证成功
  if (['2', '3'].includes(authStatus)) {
    next();
  } else {
    if (whiteList.concat('auth').includes(to.name)) {
      next();
    } else if (from.name === 'auth') {
      next(false);
      Vue.prototype.$message.info('请先进行实名认证！')
      NProgress.done();
    } else {
      next({ name: 'auth' });
      Vue.prototype.$message.info('请先进行实名认证！')
      NProgress.done();
    }
  }
}