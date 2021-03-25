<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <page-tools :show-before="true">
      <template v-slot:before>
        <span >我想你们</span>
      </template>

      <template v-slot:after>
        <el-button slot="after" type="primary">导入excel</el-button>
      </template>
    </page-tools>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PageTools from '@/components/PageTools'

export default {
  name: 'Dashboard',
  components: { PageTools },
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['name'])
  },
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

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
