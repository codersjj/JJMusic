// pages/detail-songs/index.js
import { rankingStore } from '../../store/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rankingName: "",
    rankingInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { rankingName } = options
    this.setData({ rankingName })

    // 1. 获取数据
    rankingStore.onState(rankingName, this.getRankingDataHandler)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    rankingStore.offState(this.data.rankingName, this.getRankingDataHandler)
  },

  getRankingDataHandler(res) {
    this.setData({ rankingInfo: res })
  }
})