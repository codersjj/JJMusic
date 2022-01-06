// pages/home-music/index.js
import { getBanners } from '../../service/api_music'
import queryRect from '../../utils/query_rect'
import throttle from '../../utils/throttle'

// 对 queryRect 函数进行节流操作
const throttleQueryRect = throttle(queryRect, 500)

Page({
	data: {
		banners: [],
		swiperHeight: 0
	},

	onLoad: function (options) {
		// 获取页面数据
		this.getPageData()
	},

	// 网络请求，获取页面数据
	getPageData: function() {
		getBanners().then(res => {
			this.setData({ banners: res.banners })
		})
	},

	// 事件处理
	handleSearchClick() {
		wx.navigateTo({
			url: '/pages/search-detail/index'
		})
	},
	
	handleSwiperImageLoaded() {
		console.log('图片加载完啦')
		// 获取图片的高度 -> 获取某一个组件（image 组件）的高度
		throttleQueryRect('.swiper-image').then(res => {
			console.log("组件信息查询到了")
      const rect = res[0]
      this.setData({ swiperHeight: rect.height })
		})
	},

	onUnload: function () {

	},

})