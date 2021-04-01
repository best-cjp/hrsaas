// 导出员工的路由规则
import layout from '@/layout'

export default {
  path: '/social', //路由地址
  component: layout, // 组件  //给路由规则加一个name
  name: 'social_securitys',
  // 配置二级的路由表
  children: [
    {
      path: '',
      component: () => import('@/views/social'),
      //左侧导航读取了这里的title信息
      meta: { title: '社保', icon: 'table' }
    }
  ]
}
