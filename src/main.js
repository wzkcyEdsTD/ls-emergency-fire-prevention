import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import echarts from 'echarts'


import "@/font/Digital-7Mono.css";
import "@/font/YouSheBiaoTiHei.css";
import "@/font/PingFang.css";
import "@/font/DIN.css";
import "@/font/DIN-Regular.css"

import '@/icons' // icon
import '@/permission' // permission control
import '@/libs/rem.js'
import 'video.js/dist/video-js.css'
import VueBus from "vue-bus";
import VueCookies from "vue-cookies";
Vue.use(VueCookies);

import map from '@/utils/map'
Vue.prototype.$map = map
Vue.prototype.$echarts = echarts
Vue.use(VueBus);

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false



const vue = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

export default vue
