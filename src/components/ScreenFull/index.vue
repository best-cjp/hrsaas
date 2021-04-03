<template>
  <!-- 放置一个图标 -->
  <div>
    <!-- 放置一个svg的图标 -->
    <svg-icon
      icon-class="fullscreen"
      style="color:#fff; width: 20px; height: 20px"
      @click="changeScreen"
    />
  </div>
</template>

<script>
import ScreenFull from 'screenfull'

export default {
  name: '',
  // [kəm'ponənts] 组件
  components: {},
  props: {},
  data() {
    return {}
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
    //   改变全屏
    changeScreen() {
      if (!ScreenFull.isEnabled) {
        // 此时全屏不可用
        this.$message.warning('此时全屏组件不可用')
        return
      }
      // document.documentElement.requestFullscreen()  原生js调用
      //   如果可用 就可以全屏
      ScreenFull.toggle()
    }
  }
}
</script>

<style scoped lang="scss"></style>
