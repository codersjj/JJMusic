// pages/home-music/index.js
import { rankingStore } from '../../store/index'

import { getBanners, getSongMenu } from '../../service/api_music'
import queryRect from '../../utils/query_rect'
import throttle from '../../utils/throttle'

// 对 queryRect 函数进行节流操作
const throttleQueryRect = throttle(queryRect, 500)

Page({
	data: {
		banners: [],
		swiperHeight: 0,
		hotSongMenus: [],
		recommendSongMenus: [],
		// 会进行共享的数据
		recommendSongs: [],
		rankings: { 0: {}, 2: {}, 3: {} }
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
		rankingStore.onState('newRanking', this.getNewRankingHandler(0))
		rankingStore.onState('originRanking', this.getNewRankingHandler(2))
		rankingStore.onState('upRanking', this.getNewRankingHandler(3))
	},

	// 网络请求，获取页面数据
	getPageData: function() {
		getBanners().then(res => {
			this.setData({ banners: res.banners })
		})

		getSongMenu().then(res => {
			this.setData({ hotSongMenus: res.playlists })
		})

		getSongMenu('华语').then(res => {
			this.setData({ recommendSongMenus: res.playlists })
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
		// 页面销毁时，取消对共享数据的监听
		// 当然，这里因为是首页（音乐页面/视频页面），所以不会被销毁
		// rankingStore.offState('newRanking', this.getNewRankingHandler)
	},

	getNewRankingHandler(idx) {
		return (res) => {
			if (Object.keys(res).length === 0) return
			const {
				name,
				tracks: songList,
				coverImgUrl
			} = res
			const top3SongList = songList.slice(0, 3)
			const ranking = {
				name,
				songList: top3SongList,
				coverImgUrl
			}
			const newRankings = { ...this.data.rankings, [idx]: ranking }
			this.setData({ rankings: newRankings })
		}
	}

})