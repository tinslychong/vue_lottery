import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'


import '@/icons' // icon
import '@/permission' // permission control
import 'lib-flexible'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

import axios from 'axios';

let http = axios.create({
  timeout: 3000,  //超时配置 3秒
  responseType: 'json',  // 响应数据格式
  responseEncoding: 'utf8', // 响应数据编码
});

Vue.prototype.$reqs=http;
axios.defaults.baseURL = '/game_api'



new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
