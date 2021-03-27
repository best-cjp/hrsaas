<template>
  <el-dialog title="新增员工" :visible.sync="showAddEmp" @close="btnCancel">
    <el-form
      ref="addEmployee"
      :model="formData"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item label="姓名" prop="username">
        <el-input
          v-model="formData.username"
          style="width:50%"
          placeholder="请输入姓名"
        />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input
          v-model="formData.mobile"
          style="width:50%"
          placeholder="请输入手机号"
        />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker
          v-model="formData.timeOfEntry"
          style="width:50%"
          placeholder="请选择入职时间"
        />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select
          v-model="formData.formOfEmployment"
          style="width:50%"
          placeholder="请选择"
        >
          <el-option
            v-for="item in EmployeesEnum.hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input
          v-model="formData.workNumber"
          style="width:50%"
          placeholder="请输入工号"
        />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input
          @focus="getDepartments"
          v-model="formData.departmentName"
          style="width:50%"
          placeholder="请选择部门"
        />
        <!-- 放置一个树形组件 -->
        <el-tree
          v-loading="loading"
          v-if="showTree"
          :data="treeData"
          :props="{ label: 'name' }"
          :default-expand-all="true"
          @node-click="selectNode"
        />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker
          v-model="formData.correctionTime"
          style="width:50%"
          placeholder="请选择转正时间"
        />
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer" justify="center">
      <el-button @click="btnCancel">取 消</el-button>
      <el-button type="primary" @click="btnOK">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils/index'
import EmployeesEnum from '@/api/constant/employees'
import addEmployeesUser from '@/api/employees'

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
      formLabelWidth: '100px',
      // 表单数据
      treeData: [], // 定义数组接收树形数据
      showTree: false, // 控制树形的显示或者隐藏
      loading: false, // 控制树的显示或者隐藏进度条
      // 表单数据
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      // 表单校验
      rules: {
        username: [
          { required: true, message: '用户姓名不能为空', trigger: 'blur' },
          {
            min: 1,
            max: 4,
            message: '用户姓名为1-4位'
          }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          {
            pattern: /^1[3-9]\d{9}$/,
            message: '手机号格式不正确',
            trigger: 'blur'
          }
        ],
        formOfEmployment: [
          { required: true, message: '聘用形式不能为空', trigger: 'blur' }
        ],
        workNumber: [
          { required: true, message: '工号不能为空', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '部门不能为空', trigger: 'change' }
        ],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
      },
      treeData: [], // 接收树形结构
      showTree: false, // 默认tree隐藏
      loading: false, // 进度条默认隐藏
      EmployeesEnum: EmployeesEnum
      // showAddEmp: this.showAddEmp  
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
  methods: {
    async getDepartments() {
      this.showTree = true
      this.loading = true
      const { depts } = await getDepartments()
      // depts是一个数组，要转化成树形结构,才可以被el-tree显示
      this.treeData = tranListToTreeData(depts, '')
      this.loading = false
    },
    // 点击部门赋值
    selectNode(node) {
      this.formData.departmentName = node.name
      this.showTree = false
    },
    async btnOK() {
      try {
        // 校验整个表单
        await this.$refs.addEmployee.validate()
        // 调用新增
        await addEmployeesUser(this.formData)
        // 重新渲染页面
        this.$parent.getDepartments && this.$parent.getDepartments()
        // 关闭弹层
        // this.$parent.showAddEmp = false
        this.$emit('update:showAddEmp', false)
      } catch (error) {
        this.$message.error('新增员工失败')
      }
    },
    btnCancel() {
      // 重置原来的数据
      this.formData = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }
      // 重置校验结果
      this.$refs.addEmployee.resetFields()
      this.$emit('update:showAddEmp', false)
    }
  }
}
</script>

<style scoped lang="scss"></style>
