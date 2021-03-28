<template>
  <div>
    <el-upload
      list-type="picture-card"
      :limit="1"
      action="#"
      :on-preview="preview"
      :on-remove="handleRemove"
      :on-change="changeFile"
      :file-list="fileList"
      :class="{ disabled: !fileComputed }"
    >
    </el-upload>
    <!-- 预览弹层 -->
    <el-dialog title="图片预览" :visible.sync="showDialog">
      <img :src="imgUrl" style="width:100%" alt="" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: '',
  // 英 [kəm'pəʊnənts]  美 [kəm'ponənts]
  // n. 部件；组件；成份（component复数）
  components: {},
  props: {},
  data() {
    return {
      fileList: [], // 图片地址设置为数组
      showDialog: false, // 控制显示弹层
      imgUrl: ''
    }
  },
  // 计算
  computed: {
    // 如果为true表示不应该显示+号
    fileComputed() {
      return this.fileComputed === 1
    }
  },
  // 监听
  watch: {},
  // 实例创建后
  created() {},
  // 实例渲染后
  mounted() {},
  // 方法
  methods: {
    preview(file) {
      this.imgUrl = file.url
      this.showDialog = true
    },
    // 删除方法
    // file文件，fileList删除之后的文件
    handleRemove(file, fileList) {
      // this.fileList = fileList
      // this.fileList = this.fileList.filter(item => item.id !== file.uid) // 将当前的删除文件排除在外
      this.fileList = this.fileList.filter(item => item.uid !== file.uid)
    },
    // 增
    changeFile(file, fileList) {
      // file是当前文件，fileList是当前最新数组
      this.fileList = fileList.map(item => item)
    }
  }
}
</script>

<style scoped lang="scss">
.disabled .el-upload--picture-card {
  display: none;
}
</style>
