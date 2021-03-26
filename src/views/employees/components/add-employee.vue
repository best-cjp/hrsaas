<template>
  <el-dialog title="新增员工" :visible.sync="showAddEmp">
    <el-form label-width="120px">
      <el-form-item label="姓名">
        <el-input style="width:50%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机">
        <el-input style="width:50%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间">
        <el-date-picker style="width:50%" placeholder="请选择入职时间" />
      </el-form-item>
      <el-form-item label="聘用形式">
        <el-select style="width:50%" placeholder="请选择" />
      </el-form-item>
      <el-form-item label="工号">
        <el-input style="width:50%" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门">
        <el-input style="width:50%" placeholder="请选择部门" />
      </el-form-item>
      <el-form-item label="转正时间">
        <el-date-picker style="width:50%" placeholder="请选择转正时间" />
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer" justify="center">
      <el-button @click="showAddEmp = false">取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: '',
  // 英 [kəm'pəʊnənts]  美 [kəm'ponənts]
  // n. 部件；组件；成份（component复数）
  components: {},
  props: {
    showAddEmp: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formLabelWidth: '100px'
    }
  },
  // 计算
  computed: {},
  // 监听
  watch: {},
  // 实例创建后
  created() {},
  // 实例渲染后
  mounted() {},
  // 方法
  methods: {}
}
</script>

<style scoped lang="scss"></style>
