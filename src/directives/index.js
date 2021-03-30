// 负责管理所有的自定义指令

export const imagerror = {
  // 指令对象，会在当前的dom元素插入到节点之后执行
  inserted(dom, options) {
    // options是指令中的变量的解释，其中有一个属性叫value
    // dom 表示当前指令作用的dom对象
    // dom 认为此地址就是图片
    dom.src = dom.src || options.value // 初始化的时候，如果有值则赋值，如果没有则进行默认赋值
    // 当图片有地址，但是地址没有加载成功的时候，会报错，会触发图片的一个事件 =>onerror
    dom.onerror = function() {
      // dom可以注册error事件
      dom.src = options.value // 这里不能写死是哪张具体的图片
    }
  },
  componentUpdated(dom, options) {
    dom.src = dom.src || options.value
  }
}
