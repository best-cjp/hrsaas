// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
import { getTimeStamp } from '@/utils/auth'
const TimeOut = 2000 // 定义超时时间

// 创建一个axios的实例
const service = axios.create({
  // 当执行 npm run dev 就是运行开发环境，会经过 .evn.development,然后把里面的开发地址改为/api，才能触发反向代理实现跨域
  baseURL: process.env.VUE_APP_BASE_API, // 这里是生产环境的基准地址
  timeout: 5000 // 设置超时时间
})

// 请求拦截器
service.interceptors.request.use(
  // config是请求的配置信息
  config => {
    // 注入Token
    // 如果有token
    if (store.getters.token) {
      if (IsCheckTimeOut()) {
        // 为true则为过期
        store.dispatch('user/logout') // 退出
        router.push('/login') // 跳转
        // 返回
        return Promise.reject(new Error('TOKEN 超时了'))
      }
      config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }
    return config // 这里必须return config,不然页面不知道你没有配置config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器 ，返回两个回调函数，一个成功，一个失败
service.interceptors.response.use(
  response => {
    // axios返回数据时默认加了一层data,解构要返回去的三个数据
    const { success, message, data } = response.data
    // 要根据success的成功与否决定下面的操作
    if (success) {
      return data
    } else {
      // 业务已经错误了，不能让它进入then，应该进catch
      Message.error(message) // 提示错误消息
      return Promise.reject(new Error(message))
    }
  },
  error => {
    if (error && error.response && error.response.data.code === 10002) {
      // 退出
      store.dispatch('user/logout')
      // 跳转
      router.push('/login')
      // 返回
      return Promise.reject(new Error('TOKEN 超时了'))
    }
    // 提示错误信息
    Message.error(error.message)
    // 返回执行错误，让当前的执行链跳出成功，直接进入catch,promise.reject会自动跳到catch里面捕获错误
    return Promise.reject(error)
  }
)

// 超时=(当前时间-缓存中的时间) 是否 大于 时间差
function IsCheckTimeOut() {
  // 当前时间
  var currentTime = Date.now()
  // 缓存时间戳
  var timeStamp = getTimeStamp()
  return (currentTime - timeStamp) / 1000 > TimeOut
}

export default service // 导出axios实例
