import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'

import { resetRouter } from '@/router/index'
// 状态
// 初始化的时候从缓存中读取状态 并赋值到初始化的状态上
const state = {
  token: getToken(), // 设置token为共享状态，初始化vuex的时候，就先从缓存中读取
  userInfo: {} // 这里定义一个空对象,不是null,因为后边我要开发userInfo的属性给别人用  userInfo.name
  /* userInfo为什么我们不设置为null，而是设置为 {}
因为我们会在getters中引用userinfo的变量，如果设置为null，则会引起异常和报错 */
}
const mutations = {
  saveToken(state, token) {
    state.token = token // 将数据设置为vuex
    // 同步给缓存
    setToken(token)
  },
  deleteToken(state) {
    state.token = null // 将vuex的数据置空
    removeToken() // 同步到缓存
  },
  setUserInfo(state, result) {
    // 更新state的数据
    state.userInfo = result // 这样是响应式数据
    // state.userInfo = { ...result } // 这样也是响应式数据，属于浅拷贝
  },
  // 删除用户信息资料
  deleteUserInfo(state) {
    state.UserInfo = {}
  }
}
const actions = {
  // 调用login方法将请求的数据中的token缓存到state中
  async login(context, data) {
    // 调用api接口
    const result = await login(data) // 这里的result已经在响应拦截器里解构过了
    // axios默认加了一层data
    // if (result.data.success) {
    //   // 如果为true，表示登录成功
    //   context.commit('saveToken', result.data.data)
    // }
    context.commit('saveToken', result)
    // 设置当前时间戳
    setTimeStamp()
  },

  // 获取用户信息资料操作
  async getInfo(context) {
    const result = await getUserInfo()
    // 这里获取用户信息，用户的详情数据，为了显示头像
    const baseInfo = await getUserDetailById(result.userId)
    // 合并上面获取的数据
    const obj = { ...result, ...baseInfo }
    context.commit('setUserInfo', obj) // 提交到mutations
    return result // 这里是给后期做权限的时候，留下的伏笔
  },

  // 登录退出的操作

  logout(context) {
    // 删除token
    context.commit('deleteToken')
    // 删除用户资料
    context.commit('deleteUserInfo')
    // 重置路由
    resetRouter()
    // 还有一步  vuex中的数据是不是还在
    // 要清空permission模块下的state数据
    // vuex中 user子模块  permission子模块
    // 子模块调用子模块的action  默认情况下 子模块的context是子模块的
    // 父模块 调用 子模块的action
    context.commit('permission/setRoutes', [], { root: true })
    // 子模块调用子模块的action 可以 将 commit的第三个参数 设置成  { root: true } 就表示当前的context不是子模块了 而是父模块
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
