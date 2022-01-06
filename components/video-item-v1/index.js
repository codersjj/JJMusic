// components/video-item-v1/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {}
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
    handleItemClick(event) {
      // console.log('handleItemClick invoked')
      // const id = event.currentTarget.dataset.item.id
      // wx.navigateTo({
      //   url: '/pages/video-detail/index?id=' + id,
      // })
    }
  }
})
