<template>
  <el-dialog title="分配角色" :visible="showRoleDialog">
    <!-- el-checkbox-group选中的是 当前用户所拥有的角色  需要绑定 当前用户拥有的角色-->

    <!-- 选项 分配角色 -->
    <el-checkbox-group v-model="roleIds">
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button type="primary" size="small">确定</el-button>
        <el-button size="small">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRoleList } from '@/api/setting'
import { getUserDetailById } from '@/api/user'

export default {
  name: '',
  // 英 [kəm'pəʊnənts]  美 [kəm'ponənts]
  // n. 部件；组件；成份（component复数）
  components: {},
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    },
    // 用户的id 用来查询当前用户的角色信息
    userId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      roleIds: [],
      list: []
    }
  },
  // 计算
  computed: {},
  // 监听
  watch: {},
  // 实例创建后
  created() {
    this.getRoleList()
  },
  // 实例渲染后
  mounted() {},
  // 方法
  methods: {
    // 获取所有的角色
    async getRoleList() {
      const { rows } = await getRoleList()
      this.list = rows
    },
    async getUserDetailById(id) {
      const { roleIds } = await getUserDetailById(id)
      this.roleIds = roleIds // 赋值本用户的角色
    }
  }
}
</script>

<style scoped lang="scss"></style>
