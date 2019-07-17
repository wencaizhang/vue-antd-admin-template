import Vue from "vue";
import axios from "axios";
import store from "@/store";
import router from '@/router';
import { clearToken } from '@/utils/util'
import notification from "ant-design-vue/es/notification";
import { LOGINFO, ACCESS_TOKEN, PROJECT_ID } from "@/store/mutation-types";
import { whiteList } from '@/utils/settings'

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
      case 401:
      case 403:
        const token = Vue.ls.get(LOGINFO)[ACCESS_TOKEN];
        if (token) {
          // 避免同时请求多个接口时 token 失效导致多个提示同时出现
          notification.error({ message: "请登录", description: "" });
          clearToken();
        }
        router.push({ name: 'login' })
        break;

      case 404:
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
  const logInfo = Vue.ls.get(LOGINFO) || {}
  const projectId = logInfo[PROJECT_ID] && logInfo[PROJECT_ID][0] || ''
  const token = logInfo[ACCESS_TOKEN]

  if (token) {
    // 每个请求添加自定义 headers
    config.headers["X-Token"] = token; // 让每个请求携带自定义 token 请根据实际情况自行修改
    config.headers["projectId"] = projectId; // 让每个请求携带自定义 token 请根据实际情况自行修改
  } else {
    const route = router.match(location);
    const name = route.name;
    if (whiteList.includes(name)) {
      router.push({ name: 'login' })
    }
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

function trimPayload (payload={}) {
  Object.keys(payload).forEach(key => {
    const value = payload[key];
    if ( Object.prototype.toString.call(value) === '[object String]') {
      if (key === 'description') {
        // 描述字段跳过不处理
      } else if (value === '' || value === undefined) {
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
