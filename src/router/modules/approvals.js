// 导出员工的路由规则
import layout from '@/layout'

export default {
  path: '/approvals', //路由地址
  component: layout, // 组件  //给路由规则加一个name
  name: 'approvals',
  // 配置二级的路由表
  children: [
    {
      path: '',
      component: () => import('@/views/approvals'),
      //左侧导航读取了这里的title信息
      meta: { title: '审批', icon: 'tree-table' }
    },
    {
      path: 'salaryApproval/:id',
      component: () => import('@/views/approvals/salary'),
      name: 'salaryApproval',
      hidden: true,
      meta: {
        title: '工资审核',
        icon: 'approval',
        noCache: true
      }
    },
    {
      path: 'enterApproval/:id',
      component: () => import('@/views/approvals/enter'),
      name: 'enterApproval',
      hidden: true,
      meta: {
        title: '入职审核',
        icon: 'approval',
        noCache: true
      }
    },
    {
      path: 'leaveApproval/:id',
      component: () => import('@/views/approvals/leave'),
      name: 'leaveApproval',
      hidden: true,
      meta: {
        title: '申请请假',
        icon: 'approval',
        noCache: true
      }
    },
    {
      path: 'quitApproval/:id',
      component: () => import('@/views/approvals/quit'),
      name: 'quitApproval',
      hidden: true,
      meta: {
        title: '申请离职',
        icon: 'approval',
        noCache: true
      }
    },
    {
      path: 'overtimeApproval/:id',
      component: () => import('@/views/approvals/overtime'),
      name: 'overtimeApproval',
      hidden: true,
      meta: {
        title: '加班申请',
        icon: 'approval',
        noCache: true
      }
    },
    {
      path: 'securitySetting',
      component: () => import('@/views/approvals/security'),
      name: 'securitySetting',
      hidden: true,
      meta: {
        title: '设置',
        icon: 'approval',
        noCache: true
      }
    }
  ]
}
