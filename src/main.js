import 'babel-polyfill';
import Vue from 'vue';
import Storage from 'vue-ls';
// import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import './assets/styles.css';
import router from './router';
import store from './store';
import axios from 'axios'
import App from './App.vue';
import config from '@/settings'
import '@/permission' // 权限控制

import '@/utils/util'
import './components_use'

// 只在开发模式下引入 mock.js，打包部署不引入 mock.js
process.env.NODE_ENV === 'production' || require('./mock/index.js');

Vue.prototype.$http = axios;

Vue.use(Storage, config.storageOptions)
// Vue.use(Antd);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
