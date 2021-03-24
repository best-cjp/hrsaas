<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构内容-头部 -->
      <el-card class="tree-card">
        <!-- 结构内容 -->
        <tree-tools :tree-node="company" :isRoot="true" @addDepts="addDepts" />
        <!-- 放置一个<el-rtee></el-rtee> -->
        <el-tree
          :data="departs"
          :props="defaultProps"
          :default-expand-all="true"
          @node-click="handleNodeClick"
        >
          <!-- 传入插槽内容 -->
          <tree-tools
            slot-scope="{ data }"
            :tree-node="data"
            @delDepts="getDepartments"
            @addDepts="addDepts"
          />
        </el-tree>
      </el-card>
    </div>

    <!-- 放置新增弹层组件 -->
    <add-dept
      :show-dialog="showDialog"
      :tree-node="node"
      @addDept="getDepartments"
    ></add-dept>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
import AddDept from './components/add-dept.vue'

export default {
  components: {
    TreeTools,
    AddDept
  },
  data() {
    return {
      company: {},
      departs: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      // 不显示弹层
      showDialog: false,
      // 记录当前node节点
      node: null
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    handleNodeClick() {},
    async getDepartments() {
      const result = await getDepartments()
      this.company = { name: result.companyName, manager: '负责人', id: '' }
      // 需要转化成树形结构
      this.departs = tranListToTreeData(result.depts, '')
      // console.log(result)
    },
    // 监听tree-tools中点击添加子部门的事件
    addDepts(node) {
      this.showDialog = true
      this.node = node
    }
  }
}
</script>

<style>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
