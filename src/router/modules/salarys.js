// 导出员工的路由规则
import layout from '@/layout'

export default {
  path: '/salarys', //路由地址
  component: layout, // 组件  //给路由规则加一个name
  name: 'salarys',
  // 配置二级的路由表
  children: [
    {
      path: '',
      component: () => import('@/views/salarys'),
      //左侧导航读取了这里的title信息
      meta: { title: '工资', icon: 'money' }
    },
    {
      path: 'setting',
      component: () => import('@/views/salarys/setting'),
      name: 'salarysSetting',
      hidden: true,
      meta: {
        title: '设置'
      }
    },
    {
      path: 'details/:yearMonth/:id',
      component: () => import('@/views/salarys/detail'),
      name: 'salarysDetails',
      hidden: true,
      meta: {
        title: '详情'
      }
    },
    {
      path: 'historicalArchiving',
      component: () => import('@/views/salarys/historical'),
      name: 'salarysHistorical',
      hidden: true,
      meta: {
        title: '历史归档'
      }
    },
    {
      path: 'monthStatement',
      component: () => import('@/views/salarys/month'),
      name: 'salarysMonthStatement',
      hidden: true,
      meta: {
        title: '月报表'
      }
    }
  ]
}
