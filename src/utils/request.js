import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import notification from 'ant-design-vue/es/notification'
import { ACCESS_TOKEN } from "@/store/mutation-types"

// 创建 axios 实例
const service = axios.create({
  baseURL: '/api', // api base_url
  timeout: 6000 // 请求超时时间
})

const errHandle = (error) => {
  if (error.response) {
    switch (error.status) {
      case 403:
        notification.error({ message: '拒绝访问', description: '无权限，拒绝访问' })
        break;
      case 401:
        notification.error({ message: '未授权', description: '授权验证失败' })
        store.dispatch('Logout').then(() => {
          location.reload()
        })
        break;
      default:
        notification.error({ message: 'Error', description: '请求出错，请重试' })
        break;
    }
  }
  return Promise.reject(error)
};

// request 拦截器
service.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN)
  if (token) {
    config.headers['Access-Token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
}, errHandle)

// response 拦截器
service.interceptors.response.use((response) => {
  return response.data
}, errHandle)

export default service;