// 导出员工的路由规则
import layout from '@/layout'

export default {
  path: '/employees', //路由地址
  component: layout, // 组件  //给路由规则加一个name
  name: 'employees',
  // 配置二级的路由表
  children: [
    {
      path: '', // 二级路由的默认路由
      component: () => import('@/views/employees'),
      meta: {
        title: '员工管理',
        icon: 'people'
      }
    },
    {
      path: 'detail/:id?',
      component: () => import('@/views/employees/detail'),
      hidden: true,
      meta: {
        title: '员工管理'
      }
    }
  ]
}
