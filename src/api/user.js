import request from '@/utils/request'

// 登录接口封装
export function login(data) {
  // 通过return 返回一个promise对象
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

/**
 *  获取用户的基本资料
 *
 * **/
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

// 获取用户的基本信息，现在写他完全是为了显示头像 （调用的是获取员工基本信息的接口）
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}

export function logout() {}
