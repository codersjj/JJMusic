// app.js
App({
  onLaunch() {
    // 在应用程序启动时获取系统信息
    const systemInfo = wx.getSystemInfoSync()
    // 屏幕宽度、高度不会变，没有必要去使用响应式的全局状态管理 hy-event-store，直接存在 app 的 globalData 中即可
    this.globalData.screenWidth = systemInfo.screenWidth
    this.globalData.screenHeight = systemInfo.screenHeight
  },
  globalData: {
    screenWidth: 0,
    screenHeight: 0
  }
})
