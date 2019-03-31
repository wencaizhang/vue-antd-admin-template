import Vue from "vue";
import axios from "axios";
import store from "@/store";
import router from '@/router';
import { clearToken } from '@/utils/util'
import notification from "ant-design-vue/es/notification";
import { ACCESS_TOKEN, PROJECT_ID } from "@/store/mutation-types";

// 创建 axios 实例
const service = axios.create({
  baseURL: "/cmp/v1",
  timeout: 20000 // 请求超时时间
});


const errHandle = error => {
  if (error.response) {
    const data = error.response.data;
    const msg = data.desc || data.exception;

    switch (error.response.status) {
      case 404:
        break;
      case 403:
        const token = Vue.ls.get(ACCESS_TOKEN);
        if (token) {
          // 避免同时请求多个接口时 token 失效导致多个提示同时出现
          notification.error({ message: "Token 失效", description: "请重新登录" });
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
  const projectId = Vue.ls.get(PROJECT_ID)
  if (token) {
    // 每个请求添加自定义 headers 
    config.headers["tokenId"] = token; // 让每个请求携带自定义 token 请根据实际情况自行修改
    config.headers["projectId"] = projectId; // 让每个请求携带自定义 token 请根据实际情况自行修改
  } else {
    router.push({ name: 'login' })
  }
  // console.log('>>>>>>>>')
  // console.log(config)
  // console.log('>>>>>>>>')


  /**
   * 取消 axios 请求
   */
  
  // const CancelToken = axios.CancelToken;
  // const source = CancelToken.source();
  
  // source.throwIfRequested = source.token.throwIfRequested;
  // source.promise.then = source.token.promise.then.bind(source.promise);
  // source.promise.catch = source.token.promise.catch.bind(source.promise);

  // Vue.prototype.source = source;
  // config.cancelToken = source;

  return config;
}, errHandle);

// response 拦截器
service.interceptors.response.use(response => {
  return response.data;
}, errHandle);

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} payload [请求时携带的参数]
 */
export function GET(url, payload) {
  return service.get(url, {
    params: payload
  });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} payload [请求时携带的参数]
 */
export function POST(url, payload) {
  return service.post(url, payload);
}
/**
 * delete方法，对应delete请求
 * @param {String} url [请求的url地址]
 * @param {Object} payload [请求时携带的参数]
 */
export function DELETE(url, payload) {
  return service.delete(url, {
    data: payload
  });
}
