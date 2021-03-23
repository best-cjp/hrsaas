<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构内容-头部 -->
      <el-card class="tree-card">
        <!-- 结构内容 -->
        <el-row
          type="flex"
          justify="space-between"
          align="middle"
          style="height: 40px"
        >
          <!-- 左侧内容 -->
          <el-col>
            <span>江苏传智播客教育科技股份有限公司</span>
          </el-col>

          <!-- 右侧内容 -->
          <el-col :span="4">
            <el-row type="flex" justify="end">
              <!-- 两个内容 -->
              <el-col>负责人</el-col>
              <el-col>
                <!-- 下拉菜单 element -->
                <el-dropdown>
                  <!-- 操作 -->
                  <span> 操作<i class="el-icon-arrow-down" /> </span>
                  <!-- 下拉插槽 -->
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>添加子部门</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
            <!-- /右侧内容 -->
          </el-col>
        </el-row>

        <!-- 放置一个<el-rtee></el-rtee> -->
        <el-tree
          :data="data"
          :props="defaultProps"
          :default-expand-all="true"
          @node-click="handleNodeClick"
        >
          <!-- 传入插槽内容 -->

          <el-row
            slot-scope="{ data }"
            type="flex"
            justify="space-between"
            align="middle"
            style="height: 40px;width:100%"
          >
            <!-- 左侧内容 -->
            <el-col>
              <span>{{ data.label }}</span>
            </el-col>

            <!-- 右侧内容 -->
            <el-col :span="4">
              <el-row type="flex" justify="end">
                <!-- 两个内容 -->
                <el-col>{{ data.manager }}</el-col>
                <el-col>
                  <!-- 下拉菜单 element -->
                  <el-dropdown>
                    <!-- 操作 -->
                    <span> 操作<i class="el-icon-arrow-down" /> </span>
                    <!-- 下拉插槽 -->
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item>添加子部门</el-dropdown-item>
                      <el-dropdown-item>编辑子部门</el-dropdown-item>
                      <el-dropdown-item>删除子部门</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
              </el-row>
              <!-- /右侧内容 -->
            </el-col>
          </el-row>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
