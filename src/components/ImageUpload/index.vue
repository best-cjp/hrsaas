<template>
  <div>
    <el-upload
      list-type="picture-card"
      :limit="1"
      action="#"
      :on-preview="preview"
      :on-remove="handleRemove"
      :on-change="changeFile"
      :before-upload="beforeUpload"
      :file-list="fileList"
      :class="{ disabled: !fileComputed }"
      :http-request="upload"
    >
    </el-upload>
    <!-- 预览弹层 -->
    <el-dialog title="图片预览" :visible.sync="showDialog">
      <img :src="imgUrl" style="width:100%" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'

// 实例化COS对象
const cos = new COS({
  SecretId: AKIDqnZ8slLmZLBk9Iq8gyA7oHHfghT2CiPt,
  SecretKey: Un2Poy0EPN71kDTdeWEuNLsDMtEQQufa
})

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
    handleRemove(file, fileList) {
      // file文件，fileList删除之后的文件
      // this.fileList = fileList
      // this.fileList = this.fileList.filter(item => item.id !== file.uid) // 将当前的删除文件排除在外
      this.fileList = this.fileList.filter(item => item.uid !== file.uid)
    },
    // 增
    changeFile(file, fileList) {
      // file是当前文件，fileList是当前最新数组
      this.fileList = fileList.map(item => item)
    },
    // 控制上传的类型和大小
    beforeUpload(file) {
      // 要开始做文件上传的检查了
      // 文件类型 文件大小
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.includes(file.type)) {
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
      }
      //  检查大小
      const maxSize = 5 * 1024 * 1024
      if (maxSize < file.size) {
        this.$message.error('图片大小最大不能超过5M')
        return false
      }
      return true
    },
    // 上传操作
    upload(params) {
      if (params.file) {
        cos.putObject(
          {
            Bucket: 'best-1305406446', // 存储桶
            Region: 'ap-nanjing', // 地域
            Key: params.file.name, // 文件名
            Body: params.file, // 要上传的文件对象
            StorageClass: 'STANDARD' // 上传的模式类型 直接默认 标准模式即可
          },
          function(err, data) {
            // data返回数据之后 应该如何处理
            console.log(err || data)
          }
        )
      }
    }
  }
}
</script>

<style scoped lang="scss">
.disabled .el-upload--picture-card {
  display: none;
}
</style>
