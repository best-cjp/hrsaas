// 引入PageTolls文件
import PageTools from './PageTools/index.vue'

// 导出并注册全局组件
export default {
  install(Vue) {
    // 注册全局组件
    Vue.component('PageTools', PageTools)
  }
}
