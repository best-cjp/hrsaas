<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构内容-头部 -->
      <el-card class="tree-card">
        <!-- 结构内容 -->
        <tree-tools :tree-node="company" :isRoot="true" />
        <!-- 放置一个<el-rtee></el-rtee> -->
        <el-tree
          :data="data"
          :props="defaultProps"
          :default-expand-all="true"
          @node-click="handleNodeClick"
        >
          <!-- 传入插槽内容 -->
          <tree-tools slot-scope="{ data }" :tree-node="data" />
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'

export default {
  components: {
    TreeTools
  },
  data() {
    return {
      company: { label: '江苏传智播客教育科技股份有限公司', manager: '负责人' },
      data: [
        {
          label: '总裁办',
          manager: '曹操',
          children: [
            {
              label: '董事会',
              manager: '曹丕'
            }
          ]
        },
        {
          label: '行政部',
          manager: '刘备'
        },
        {
          label: '人事部',
          manager: '孙权'
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
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
