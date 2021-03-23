<template>
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height: 40px;width:100%"
  >
    <!-- 左侧内容 -->
    <el-col>
      <span>{{ treeNode.name }}</span>
    </el-col>

    <!-- 右侧内容 -->
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <!-- 两个内容 -->
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <!-- 下拉菜单 element -->
          <el-dropdown @command="operateDepts">
            <!-- 操作 -->
            <span> 操作<i class="el-icon-arrow-down" /> </span>
            <!-- 下拉插槽 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit"
                >编辑子部门</el-dropdown-item
              >
              <el-dropdown-item v-if="!isRoot" command="del"
                >删除子部门</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
      <!-- /右侧内容 -->
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: '',
  // 英 [kəm'pəʊnənts]  美 [kəm'ponənts]
  // n. 部件；组件；成份（component复数）
  components: {},
  props: {
    // 定义传入属性
    treeNode: {
      required: true,
      type: Object
    },
    isRoot: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  // 计算
  computed: {},
  // 监听
  watch: {},
  // 实例创造后
  created() {},
  // 实例渲染后
  mounted() {},
  // 方法
  methods: {
    // 点击 编辑 删除 新增
    operateDepts(type) {
      if (type === 'add') {
        //添加子部门
      } else if (type === 'edit') {
        // 编辑部门
      } else {
        // 删除部门
        alert(1)
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
