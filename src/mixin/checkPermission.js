// 做一个混入对象
// import store from '@/store'
// export default {
//   methods: {
//     checkPermission(key) {
//       const { userInfo } = store.state.user
//       if (userInfo.roles.points && userInfo.roles.points.length) {
//         return userInfo.roles.points.some(item => item === key)
//       }
//       return false
//     }
//   }
// }

import store from '@/store'

export default {
  methods: {
    // 检查权限，要么有 要么没有 key就是要检查的点
    checkPermission(key) {
      //去用户的信息里找points中有没有key 如果有key，则认为有权限，如果没有key则不能点击
      // store.state.userInfo.roles.points
      const { userInfo } = store.state.user
      if (userInfo.roles && userInfo.roles.points) {
        return userInfo.roles.points.some(item => item === key)
      }
      // 如果连if都没进去，说明没权限
      return false
    }
  }
}
