import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

// 引入PageTools全局组件
import Component from '@/components/index'

import * as filters from '@/filters' // 引入过滤器

import '@/icons' // icon
import '@/permission' // permission control
import * as directives from '@/directives'

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
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

// 遍历directives，Object.keys()是一种遍历数组，对象，数字，字符串的方法，遍历出来的都是key值
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key]) // 注册自定义指令
})

// 注册全局的过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]) // 注册自定义过滤器
})

Vue.config.productionTip = false

// 注册全局组件
Vue.use(Component)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
