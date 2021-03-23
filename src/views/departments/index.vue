<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构内容-头部 -->
      <el-card class="tree-card">
        <!-- 结构内容 -->
        <tree-tools :tree-node="company" :isRoot="true" />
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
          />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'

export default {
  components: {
    TreeTools
  },
  data() {
    return {
      company: {},
      departs: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    handleNodeClick() {},
    async getDepartments() {
      const result = await getDepartments()
      this.company = { name: result.companyName, manager: '负责人' }
      this.departs = tranListToTreeData(result.depts, '') //需要转化成树形结构
      // console.log(result)
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
