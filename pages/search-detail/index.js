// pages/search-detail/index.js
import { getSearchHot, getSearchSuggest } from '../../service/api_search'
import debounce from '../../utils/debounce'

const debounceGetSearchSuggest = debounce(getSearchSuggest, 300)

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotKeywords: [],
    suggestSongs: [],
    searchValue: '',
    getSearchResponse: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1. 获取页面的数据
    this.getPageData()
  },

  getPageData() {
    // 网络请求
    getSearchHot().then(res => {
      this.setData({ hotKeywords: res.result.hots })
    })
  },

  // 事件处理
  handleSearchChange(event) {
    this.setData({getSearchResponse: false})
    // 1. 获取输入的内容
    const searchValue = event.detail
    // 2. 保存输入的内容
    this.setData({searchValue})
    // 3. 判断关键字为空字符串时的处理逻辑
    if (!searchValue.length) {
      this.setData({ suggestSongs: [] })
      return
    }
    // 4. 根据输入的内容进行搜索
    debounceGetSearchSuggest(searchValue).then(res => {
      console.log('拿到结果，searchValue:', searchValue)
      console.log('拿到结果，this.data.searchValue:', this.data.searchValue)
      // 在执行当前这一回调函数时，如果此时搜索内容为空，直接 return（注意，这里不能使用 searchValue 变量，
      // 否则会形成闭包，拿到的是发送网络请求时的搜索内容，而不是当前的搜索内容）
      if (!this.data.searchValue.length) {
        console.log('searchValue 没有值')
        return
      }
      let suggestSongs = res.result.allMatch
      if (!suggestSongs) {
        suggestSongs = []
      }
      this.setData({ suggestSongs, getSearchResponse: true })
    })
  }

})