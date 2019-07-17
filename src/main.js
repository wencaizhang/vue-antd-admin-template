import 'babel-polyfill'
import 'ant-design-vue/dist/antd.less'
import './assets/styles/styles.css'
import './assets/styles/override.css'
import Vue      from 'vue'
import Storage  from 'vue-ls'
import uploader from 'vue-simple-uploader'
import router   from './router'
import store    from './store'
import axios    from 'axios'
import App      from './App.vue'
import { storageOptions } from '@/utils/settings'
import '@/utils/permission' // 权限控制
import '@/utils/components_use'  // 按需引入 ant-design-vue 组件

// uploader 和 mock.js 不能同时使用
Vue.use(uploader)

// 只在开发模式下引入 mock.js，打包部署不引入 mock.js
// process.env.NODE_ENV === 'production' || require('./mock/index.js')

Vue.prototype.$http = axios

Vue.use(Storage, storageOptions)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
