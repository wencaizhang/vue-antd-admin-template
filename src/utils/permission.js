import Vue from 'vue'
import NProgress from 'nprogress'  // 顶部进度条
import 'nprogress/nprogress.css'
import router from '../router'
import store from '../store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
NProgress.configure({ showSpinner: false })// NProgress Configuration

import settings from '@/utils/settings'
// 免登录白名单
const whiteList = settings.whiteList;

router.beforeEach((to, from, next) => {
  // console.log(to.name, from.name);
  NProgress.start();
  // 如果未登录
  if (!Vue.ls.get(ACCESS_TOKEN)) {
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

  // 如果已经登录，必须获取认证信息
  if (!store.state.app.authInfo.fetched) {
    store
      .dispatch('app/fetchAuthInfo')
      .then(resp => {
        store.commit('app/setAuthInfo', resp);
        if (['1', '2'].includes(resp.authType)) {
          next();
        } else {
          next({ name: 'auth' });
        }
        return;
      })
  } else {
    const authMap = {
      0: '未认证用户',
      1: '未认证用户',
      // 2: '已认证个人用户',
      // 3: '已认证企业用户',
      4: '个人认证中',
      5: '个人认证未通过',
      // 6: '企业认证中',
      // 7: '企业认证未通过',
    }
    const authType = store.getters['app/getAuthType'];
    if (Object.keys(authMap).includes(authType)) {
      // 无权限查看其他页面
      
      if (to.name === 'auth') {
        next();
      } else {
        next(false);
        NProgress.done()
        return;
      }
    }
  }

  // 正常跳转
  next()
})

router.afterEach(() => {
  NProgress.done()
})

