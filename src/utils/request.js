import Vue from "vue";
import axios from "axios";
import store from "@/store";
import router from '@/router';
import { clearToken } from '@/utils/role'
import notification from "ant-design-vue/es/notification";
import { ACCESS_TOKEN, PROJECT_ID } from "@/store/mutation-types";
import settings from '@/utils/settings'

// 免登录白名单
const whiteList = settings.whiteList;

// 创建 axios 实例
const service = axios.create({
  baseURL: "/cmp/v1",
  // timeout: 20000 // 请求超时时间
});


const errHandle = error => {
  if (error.response) {
    const data = error.response.data;
    const msg = data.desc || data.exception;

    switch (error.response.status) {
      case 404:
        break;
      case 401:
      case 403:
        const token = Vue.ls.get(ACCESS_TOKEN);
        if (token) {
          // 避免同时请求多个接口时 token 失效导致多个提示同时出现
          notification.error({ message: "请登录", description: "" });
          clearToken();
        }
        router.push({ name: 'login' })
        break;
      default:
        notification.error({ message: 'Error', description: msg });
        break;
    }
  }
  return Promise.reject(error);
};

// request 拦截器
service.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN);
  if (token) {
    // 每个请求添加自定义 headers
    config.headers["X-Token"] = token;
  } else {
    const route = router.match(location);
    const name = route.name;
    if (whiteList.includes(name)) {
      router.push({ name: 'login' });
    }
  }
  return config;
}, errHandle);

// response 拦截器
service.interceptors.response.use(response => response.data, errHandle);

// 移除值为空的属性
function trimPayload (payload={}) {
  Object.keys(payload).forEach(key => {
    const value = payload[key];
    if ( Object.prototype.toString.call(value) === '[object String]') {
      if (value === '' || value === undefined) {
        delete payload[key]
      }
    }
    if ( Object.prototype.toString.call(value) === '[object Object]') {
      trimPayload (value)
    }
  })
  return payload;
}

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} payload [请求时携带的参数]
 */
export function GET(url, payload) {
  return service.get(url, {
    params: trimPayload(payload)
  });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} payload [请求时携带的参数]
 */
export function POST(url, payload) {
  return service.post(url, trimPayload(payload));
}
/**
 * delete方法，对应delete请求
 * @param {String} url [请求的url地址]
 * @param {Object} payload [请求时携带的参数]
 */
export function DELETE(url, payload) {
  return service.delete(url, {
    data: trimPayload(payload)
  });
}
