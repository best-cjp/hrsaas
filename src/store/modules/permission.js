// 专门处理权限的路由模块
import { asyncRoutes, constantRoutes } from '@/router/index'

const state = {
  // 一开始肯定有静态路由权限
  routers: constantRoutes // 路由表 当前用户所拥有的所有路由的数据
}

const mutations = {
  // 定义修改router的mutations
  setRoutes(state, newRoutes) {
    // 这么写业务不正确
    // state.routes = [...state.routes, ...newRoutes]
    state.routes = [...constantRoutes, ...newRoutes]
    // 应该是每次更新 都应该在静态路由的基础上进行追加
  }
}
 
const actions = {
  // 筛选权限路由
  // 第二个参数为当前用户的所拥有的菜单权限
  // menus:['setting','permissions']
  // asyncRoutes 所有的动态路由 数组模式 [{path:'setting',name:'setting'}]
  filterRoutes(context, menus) {
    const routes = []
    // 筛选出 动态路由中和menus中能够对上的路由
    menus.forEach(key => {
      // item是标识
      // asyncRoutes 找 有没有 对象中的 name 属性等于key的，如果找不到就没权限，找到了要筛选出来
      routes.push(...asyncRoutes.filter(item => item.name === key))
      // 得到的routes是所有模块中满足权限要求的路由数组
      // routes就是当前用户所拥有的的 动态路由的权限
    })

    context.commit('setRoutes', routes) // 将动态路由提交给mutations
    return routes // 这里为什么还要return state数据是用来 显示左侧菜单的 return 是给路由addRoutes用的
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
