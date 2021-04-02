<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <span slot="before">共{{ page.total }}条记录</span>
        <template slot="after">
          <el-button
            size="small"
            type="warning"
            @click="$router.push('/import')"
            >Excel导入</el-button
          >
          <el-button size="small" type="danger" @click="exportData"
            >Excel导出</el-button
          >
          <el-button
            size="small"
            type="primary"
            @click="showAddEmp = true"
            v-if="checkPermission('POINT-USER-ADD')"
            >新增员工</el-button
          >
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border v-loading="loading" :data="list">
          <el-table-column type="index" label="序号" sortable="" />
          <el-table-column label="姓名" sortable="" prop="username" />

          <el-table-column label="头像" align="center">
            <!-- <template slot-scope="{ row }"> -->
            <template v-slot="{ row }">
              <img
                @click="showQrCode(row.staffPhoto)"
                v-imagerror="require('@/assets/common/bigUserHeader.png')"
                :src="row.staffPhoto"
                alt=""
                style="border-radius: 50%; width: 100px; height: 100px; padding: 10px"
              />
            </template>
          </el-table-column>
          <el-table-column label="手机号" sortable="" prop="mobile" />
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            prop="formOfEmployment"
            :formatter="formatterEmployees"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
            <!-- 作用域插槽 -->
            <!-- <template slot-scope="obj"></template> -->
            <template v-slot="{ row }">
              {{ row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="" prop="enableState">
            <template slot-scope="{ row }">
              <el-switch :value="row.enableState === 1"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <!-- <template slot-scope="{{row}}"> -->
            <template v-slot="{ row }">
              <el-button
                type="text"
                size="small"
                @click="$router.push(`/employees/detail/${row.id}`)"
                >查看</el-button
              >
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="editRole(row.id)"
                >角色</el-button
              >
              <el-button type="text" size="small" @click="delEmployee(row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            :current-page="page.page"
            :page-size="page.size"
            :total="page.total"
            @current-change="changePage"
            layout="prev, pager, next"
          />
        </el-row>
      </el-card>
    </div>
    <!-- 放置新增弹层 -->
    <add-employee :show-add-emp.sync="showAddEmp" />

    <!-- 放置二维码弹层组件 -->
    <el-dialog
      title="二维码"
      :visible="showCodeDialog"
      @close="showCodeDialog = false"
    >
      <el-row type="flex" justify="center">
        <canvas ref="myCanvas"></canvas>
      </el-row>
    </el-dialog>

    <!-- 放置分配组件 -->
    <assign-role
      ref="assignRole"
      :show-role-dialog.sync="showRoleDialog"
      :user-id="userId"
    />
  </div>
</template>

<script>
import { getEmployeesList, delEmployeesUser } from '@/api/employees'
import EmployeesEnum from '@/api/constant/employees' // 引入员工的枚举对象
import AddEmployee from './components/add-employee.vue'
import { formatDate } from '@/filters'
import QrCode from 'qrcode'
import AssignRole from './components/assign-role'

export default {
  name: '',
  // 英 [kəm'pəʊnənts]  美 [kəm'ponənts]
  // n. 部件；组件；成份（component复数）
  components: { AddEmployee, AssignRole },
  props: {},
  data() {
    return {
      loading: false,
      showAddEmp: false,
      list: [],
      page: {
        page: 1,
        size: 5,
        total: 0
      },
      showCodeDialog: false,
      showRoleDialog: false,
      userId: null
    }
  },
  // 计算
  computed: {},
  // 监听
  watch: {},
  // 实例创建后
  created() {
    this.getEmployeesList()
  },
  // 实例渲染后
  mounted() {},
  // 方法
  methods: {
    // 获取列表数据
    async getEmployeesList() {
      this.loading = true
      const { total, rows } = await getEmployeesList(this.page)
      this.page.total = total
      this.list = rows
      this.loading = false
    },
    // 获取最新页面数据
    changePage(newPage) {
      this.page.page = newPage
      this.getEmployeesList()
    },
    // 格式化聘用形式
    formatterEmployees(row, column, cellValue, index) {
      const obj = EmployeesEnum.hireType.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
    },
    // 删
    async delEmployee(id) {
      try {
        await this.$confirm('确定删除员工？')
        await delEmployeesUser(id)
        this.$message.success('删除员工成功')
        this.getEmployeesList()
      } catch (error) {
        this.$message.error('删除员工失败')
      }
    },
    exportData() {
      const headers = {
        姓名: 'username',
        手机号: 'mobile',
        入职日期: 'timeOfEntry',
        聘用形式: 'formOfEmployment',
        转正日期: 'correctionTime',
        工号: 'workNumber',
        部门: 'departmentName'
      }
      // d导出Excel
      import('@/vendor/Export2Excel').then(async excel => {
        // excel.export_json_to_excel({
        //   header: ['姓名', '工资'],
        //   data: [
        //     ['张三', 3000],
        //     ['李四', 5000]
        //   ],
        //   filename: '员工工资表'
        // })
        const { rows } = await getEmployeesList({
          page: 1,
          size: this.page.total
        })
        const data = this.formatJson(headers, rows)
        const multiHeader = [['姓名', '主要信息', '', '', '', '', '部门']]
        const merges = ['A1:A2', 'B1:F1', 'G1:G2']
        excel.export_json_to_excel({
          header: Object.keys(headers),
          data,
          filename: '员工资料表',
          multiHeader, // 复杂表头
          merges // 合并选项
        })
      })
    },
    // 将表头数据进行接应
    formatJson(headers, rows) {
      // return rows.map(item => {
      //   // item是一个对象
      //   return Object.keys(headers).map(key => {
      //     // headers[key] 中文
      //     return item[headers[key]]
      //     // return test
      //   })
      //   // return obj
      // })
      // return result
      return rows.map(item =>
        Object.keys(headers).map(key => {
          // 需要判断 字段
          if (
            headers[key] === 'timeOfEntry' ||
            headers[key] === 'correctionTime'
          ) {
            // 格式化日期
            return formatDate(item[headers[key]])
          } else if (headers[key] === 'formOfEmployment') {
            const obj = EmployeesEnum.hireType.find(
              obj => obj.id === item[headers[key]]
            )
            return obj ? obj.value : '未知'
          }
          return item[headers[key]]
        })
      )
    },
    showQrCode(url) {
      if (url) {
        this.showCodeDialog = true
        this.$nextTick(() => {
          QrCode.toCanvas(this.$refs.myCanvas, url) // 将地址转化为二维码
        })
      } else {
        this.$message.warning('用户还未上传头像')
      }
    },
    async editRole(id) {
      this.userId = id // 注意 props 传值是异步的
      await this.$refs.assignRole.getUserDetailById(id) // 父组件调用子组件方法
      this.showRoleDialog = true
    }
  }
}
</script>

<style scoped lang="less"></style>
