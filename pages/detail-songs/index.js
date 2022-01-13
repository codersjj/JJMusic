// pages/detail-songs/index.js
import { rankingStore } from '../../store/index'
import { getSongMenuDetail } from '../../service/api_music'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    rankingName: "",
    songsInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { type } = options
    this.setData({ type })
    if (type === 'rank') {
      const { rankingName } = options
      this.setData({ rankingName })
  
      // 1. 获取数据
      rankingStore.onState(rankingName, this.getRankingDataHandler)
    } else if (type === 'menu') {
      const { id } = options
      // 1. 获取数据
      getSongMenuDetail(id).then(res => {
        this.setData({ songsInfo: res.playlist})
      })
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    if (this.data.rankingName) {
      rankingStore.offState(this.data.rankingName, this.getRankingDataHandler)
    }
  },

  getRankingDataHandler(res) {
    this.setData({ songsInfo: res })
  }
})