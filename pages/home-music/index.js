// pages/home-music/index.js
import { rankingStore } from '../../store/index'

import { getBanners } from '../../service/api_music'
import queryRect from '../../utils/query_rect'
import throttle from '../../utils/throttle'

// 对 queryRect 函数进行节流操作
const throttleQueryRect = throttle(queryRect, 500)

Page({
	data: {
		banners: [],
		swiperHeight: 0,
		recommendSongs: []
	},

	onLoad: function (options) {
		// 获取页面数据
		this.getPageData()

		// 发起共享数据的请求
		rankingStore.dispatch('getRankingDataAction')

		// 从 store 中获取共享的数据
		rankingStore.onState('hotRanking', res => {
			if (!res.tracks) return
			const recommendSongs = res.tracks.slice(0, 6)
			this.setData({ recommendSongs })
		})
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
		// 获取图片的高度 -> 获取某一个组件（image 组件）的高度
		throttleQueryRect('.swiper-image').then(res => {
      const rect = res[0]
      this.setData({ swiperHeight: rect.height })
		})
	},

	onUnload: function () {

	},

})