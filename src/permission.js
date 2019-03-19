import Vue from 'vue'
import NProgress from 'nprogress'  // 顶部进度条
import 'nprogress/nprogress.css'
import notification from 'ant-design-vue/es/notification'
import router from './router'
import store from './store'
import { ACCESS_TOKEN } from "@/store/mutation-types"
NProgress.configure({ showSpinner: false })// NProgress Configuration

// 免登录白名单
const whiteList = ['login',]

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  // 未登录
  if (!Vue.ls.get(ACCESS_TOKEN)) {
    if (whiteList.includes(to.name)) {
      console.log('next')
      next()
    } else {
      next({ name: 'login' })
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
    return false;
  }
  // 已经登录，且目标路径是登录页，重定向到首页
  if (to.name === 'login') {
    next({ name: 'dashboard' })
    NProgress.done()
    return false;
  }

  

  // 已经登录，重新获取用户信息
  // if (store.getters.roles.length === 0) {
  //   store.dispatch('GetInfo').then(res => {
  //     const roles = res.result && res.result.role
  //     store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
  //       router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
  //       next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
  //     })
  //   }).catch(() => {
  //     notification.error({ message: '错误', description: '请求用户信息失败，请重试' })
  //     store.dispatch('Logout').then(() => {
  //       next({ path: '/user/login' })
  //     })
  //   })

  // } else {
  //   next()
  // }
    next()
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
