<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 靠右的按钮 -->
      <page-tools>
        <template v-slot:after>
          <el-button type="primary" size="small">添加权限</el-button>
        </template>
      </page-tools>
      <!-- 表格 -->
      <el-table border :data="list" row-key="id">
        <el-table-column label="名称" prop="name" />
        <el-table-column align="center" label="标识" prop="code" />
        <el-table-column align="center" label="描述" prop="description" />
        <el-table-column align="center" label="操作">
          <template v-slot="{ row }">
            <el-button v-if="row.type === 1" type="text">添加</el-button>
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getPermissionList } from '@/api/permisson'
import { tranListToTreeData } from '@/utils'

export default {
  name: '',
  // 英 [kəm'pəʊnənts]  美 [kəm'ponənts]
  // n. 部件；组件；成份（component复数）
  components: {},
  props: {},
  data() {
    return {
      list: []
    }
  },
  // 计算
  computed: {
    showText() {
      return this.formData.id ? '编辑' : '新增'
    }
  },
  // 监听
  watch: {},
  // 实例创建后
  created() {
    this.getPermissionList()
  },
  // 实例渲染后
  mounted() {},
  // 方法
  methods: {
    async getPermissionList() {
      // 将数据转换成了带children的树形结构
      this.list = tranListToTreeData(await getPermissionList(), '0')
      // this.list = await getPermissionList()
    }
  }
}
</script>

<style scoped lang="less"></style>
