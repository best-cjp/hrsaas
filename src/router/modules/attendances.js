// 导出员工的路由规则
import layout from '@/layout'

export default {
  path: '/attendances', //路由地址
  component: layout, // 组件  //给路由规则加一个name
  name: 'attendances',
  // 配置二级的路由表
  children: [
    {
      path: '',
      component: () => import('@/views/attendances'),
      //左侧导航读取了这里的title信息
      meta: { title: '考勤', icon: 'skill' }
    },
    {
      path: 'archiving',
      component: () => import('@/views/attendances/historical'),
      name: 'archiving',
      hidden: true,
      meta: {
        title: '归档'
      }
    },
    {
      path: 'report/:month',
      component: () => import('@/views/attendances/report'),
      name: 'reports',
      hidden: true,
      meta: {
        title: '报表'
      }
    }
  ]
}
