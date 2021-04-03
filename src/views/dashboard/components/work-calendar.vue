<template>
  <div>
    <el-row type="flex" justify="end">
      <el-select
        v-model="currentYear"
        size="small"
        style="width: 120px"
        @change="dateChange"
      >
        <el-option
          v-for="item in yearList"
          :key="item"
          :label="item"
          :value="item"
          >{{ item }}</el-option
        >
      </el-select>
      <el-select
        v-model="currentMonth"
        size="small"
        style="width: 120px;margin-left:10px"
        @change="dateChange"
      >
        <el-option v-for="item in 12" :key="item" :label="item" :value="item">{{
          item
        }}</el-option>
      </el-select>
    </el-row>
    <el-calendar v-model="currentDate">
      <template v-slot:dateCell="{ date, data }" class="content">
        <div class="date-content">
          <span class="text"> {{ data.day | getDay }}</span>
          <span v-if="isWeek(date)" class="rest">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: '',
  // [kəm'ponənts] 组件
  components: {},
  props: {
    startDate: {
      type: Date,
      // 或调函数式的返回值
      default: () => new Date() // 如果没有传递startDate就取当前时间
    }
  },
  filters: {
    getDay(value) {
      const day = value.split('-')[2]
      // return day
      return day.startsWith('0') ? day.substr(1) : day
    }
  },
  data() {
    return {
      yearList: [], // 遍历的年的数组
      currentYear: null, // 当前年
      currentMonth: null, // 当前月
      currentDate: null // 当前日
    }
  },
  // 计算
  computed: {},
  // 监听
  watch: {},
  // 实例创建后
  created() {
    // 获取当前的年份
    this.currentYear = this.startDate.getFullYear() // 得到当前的年份
    this.currentMonth = this.startDate.getMonth() + 1 // 当前月
    this.currentDate
    // 快速生成数组
    // Array.from(Array(11), function(v, i) {
    //   i + 2020 - 5
    // })
    this.yearList = Array.from(Array(11), (v, i) => this.currentYear + i - 5)
    this.dateChange() // 主动调用一下方法
  },
  // 实例渲染后
  mounted() {},
  // 方法
  methods: {
    dateChange() {
      // 生成新的日期
      this.currentDate = new Date(`${this.currentYear}-${this.currentMonth}-1`) // 以1号为开始
    },
    // 周末
    isWeek(date) {
      return date.getDay() === 6 || date.getDay() === 0
    }
  }
}
</script>

<style scoped>
::v-deep .el-calendar-day {
  height: auto;
}
::v-deep .el-calendar-table__row td,
::v-deep .el-calendar-table tr td:first-child,
::v-deep .el-calendar-table__row td.prev {
  border: none;
}
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text {
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
}
::v-deep .el-calendar-table td.is-selected .text {
  background: #409eff;
  color: #fff;
  border-radius: 50%;
}
::v-deep .el-calendar__header {
  display: none;
}
</style>
