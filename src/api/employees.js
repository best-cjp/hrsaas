import request from '@/utils/request'

// 获取员工简单列表
export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}

// 获取员工综合列表
export function getEmployeesList(params) {
  return request({
    url: '/sys/user',
    params
  })
}

// 删除员工的接口
export function delEmployeesUser(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'DELETE'
  })
}

// 新增员工接口
export function addEmployeesUser(data) {
  return request({
    url: '/sys/user',
    method: 'POST',
    data
  })
}

// 导入员工数据
export function importEmployee(data) {
  return request({
    url: '/sys/user/batch',
    method: 'POST',
    data
  })
}
