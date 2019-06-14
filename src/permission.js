import Vue from 'vue'
import NProgress from 'nprogress'  // 顶部进度条
import 'nprogress/nprogress.css'
import router from './router'
import { ACCESS_TOKEN } from "@/store/mutation-types"
NProgress.configure({ showSpinner: false })// NProgress Configuration

// 免登录白名单
const whiteList = ['login', 'register', 'forget']

router.beforeEach((to, from, next) => {
  // console.log(to.name, from.name);
  NProgress.start();
  // 未登录
  if (!Vue.ls.get(ACCESS_TOKEN)) {
    if (whiteList.includes(to.name)) {
      next()
    } else {
      next({ name: 'login' })
      NProgress.done()
    }
    return false;
  }
  // 已经登录，且目标路径是登录页，重定向到首页
  if (to.name === 'login') {
    next({ name: 'dashboard' })
    NProgress.done()
    return false;
  }

  // 正常情况下跳转
  next()
})

router.afterEach(() => {
  NProgress.done()
})
