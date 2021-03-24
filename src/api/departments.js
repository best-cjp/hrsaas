import request from '@/utils/request'

// 获取组织架构的数据
export function getDepartments() {
  return request({
    url: '/company/department'
  })
}

//根据id删除组织架构的部门
export function delDepartment(id) {
  return request({
    url: '/company/department/{id}',
    method: 'delete'
  })
}

// 新增部门
export function addDepartments(data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data //axios的boby参数data
  })
}
