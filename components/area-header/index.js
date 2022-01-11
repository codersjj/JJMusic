// components/area-header/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: '默认歌曲'
    },
    rightText: {
      type: String,
      value: '更多'
    },
    showRight: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleRightClick: function() {
      // 将当前组件中对应的点击事件发送出去
      this.triggerEvent('click')
    }
  }
})
