import router from '@/router'
import store from '@/store' // 引入store实例，和组件的this.$store是一回事
import nprogress from 'nprogress' // 引入进度条
import 'nprogress/nprogress.css' // 引入进度条样式

// 这个页面不需要导出，因为router.js已经导入了这个js文件了
// 前置守卫
// next是前置守卫必须执行的钩子,next如果不执行，页面就死了
// next()  通行
// next(false)  跳转终止
// next(地址) 跳转到这个地址
const whiteList = ['/login', '/404'] // 设置一个白名单，不受 token 控制
router.beforeEach(async(to, from, next) => {
  nprogress.start() // 开启进度条
  // 如果有token
  if (store.getters.token) {
    // 有token的情况下，才能获取资料
    // 如果要访问的是登录页
    if (to.path === '/login') {
      // 跳转到主页
      next('/')
    } else {
      // 只有通行的时候才去获取用户资料
      // 如果当前vuex中有用户的资料的id，表示已经有资料了，不需要再获取了，如果没有id才需要获取用户资料
      if (!store.getters.userId) {
        // 如果没有id才表示当前用户资料没有获取过
        // 这里必须使用await执行获取资料操作，因为只有获取完资料才能执行后面放行，不然页面资料没获取完就渲染了
        // 如果这里不使用await ,代码会直接执行后面的同步操作，不会等这个异步获取数据完了再执行
        await store.dispatch('user/getInfo')
      }
      next()
    }
  } else {
    // 没有token 的情况下,如果在白名单里面，就可以进入主页
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // 不在白名单就跳转到登录页
      next('/login')
    }
  }
  nprogress.done() // 手动强制关闭一次  为了解决 手动切换地址时  进度条的不关闭的问题
})
// 后置守卫
router.afterEach(() => {
  nprogress.done() // 关闭进度条
})
