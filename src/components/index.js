// 引入PageTolls文件
import PageTools from './PageTools/index.vue'

import UploadExcel from './UploadExcel'

import ImageUpload from './ImageUpload'

// 导出并注册全局组件
export default {
  install(Vue) {
    // 注册全局组件
    Vue.component('PageTools', PageTools) // 注册工具栏组件
    Vue.component('UploadExcel', UploadExcel) // 注册导入excel组件
    Vue.component('ImageUpload', ImageUpload) // 注册图片上传组件
  }
}
