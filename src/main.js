import Vue from 'vue';
import Storage from 'vue-ls';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import './assets/styles.css';
import router from './router';
import store from './store';
import axios from '@/utils/request'
import App from './App.vue';
import config from '@/settings'
import '@/permission' // 权限控制

Vue.prototype.$http = axios;

Vue.use(Storage, config.storageOptions)
Vue.use(Antd);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
