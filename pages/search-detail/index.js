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
    suggestSongsNodes: [],
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
      this.setData({ suggestSongs: [], suggestSongsNodes: [] })
      debounceGetSearchSuggest.cancel()
      return
    }
    // 4. 根据输入的内容进行搜索
    debounceGetSearchSuggest(searchValue).then(res => {
      // 1. 获取建议的歌曲
      let suggestSongs = res.result.allMatch
      if (!suggestSongs) {
        suggestSongs = []
      }
      this.setData({ suggestSongs, getSearchResponse: true })

      // 2. 转成 node 节点
      const suggestKeywords = suggestSongs.map(item => item.keyword)
      const suggestSongsNodes = []
      for (const keyword of suggestKeywords) {
        const nodes = []
        if (keyword.toUpperCase().startsWith(searchValue.toUpperCase())) {
          const key1 = keyword.slice(0, searchValue.length)
          const key2 = keyword.slice(searchValue.length)
          const node1 = {
            name: 'span',
            attrs: {
              style: 'color: #26ce8a;'
            },
            children: [
              {
                type: 'text',
                text: key1
              }
            ]
          }
          nodes.push(node1)
          const node2 = {
            name: 'span',
            attrs: {
              style: 'color: #000;'
            },
            children: [
              {
                type: 'text',
                text: key2
              }
            ]
          }
          nodes.push(node2)
        } else {
          const node = {
            name: 'span',
            attrs: {
              style: 'color: #000;'
            },
            children: [
              {
                type: 'text',
                text: keyword
              }
            ]
          }
          nodes.push(node)
        }
        suggestSongsNodes.push(nodes)
      }
      this.setData({ suggestSongsNodes })
    })
  }

})