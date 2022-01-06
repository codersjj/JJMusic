// pages/home-video/index.js
import { getTopMV } from '../../service/api_video'

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		topMVs: [],
		hasMore: true
	},

	/**
	 * 生命周期函数--监听页面加载（类似于 Vue 中的 created）
	 */
	onLoad: async function (options) {
		this.getTopMVData(0)
	},

	// 封装网络请求的方法
	async getTopMVData(offset) {
		try {
			// 判断是否可以请求
			// offset 为 0 时，表示第一次请求（请求第一组数据）
			if (!this.data.hasMore && offset !== 0) return

			// 在当前页面显示导航条加载动画
			wx.showNavigationBarLoading()

			// 真正请求数据
			const res = await getTopMV(offset)
			let data = this.data.topMVs
			if (offset === 0) {
				data = res.data
			} else {
				// data = data.concat(res.data)
				data = [...data, ...res.data]
			}

			// 设置数据
			this.setData({
				topMVs: data
			})
			this.setData({
				hasMore: res.hasMore
			})

			// 现在数据请求完成了
			// 在当前页面隐藏导航条加载动画
			wx.hideNavigationBarLoading({
				success: (res) => {
					// console.log('隐藏导航条加载动画成功')
				},
			})
			// 取消下拉 loading 的样式
			if (offset === 0) {
				wx.stopPullDownRefresh({
					// success: (res) => console.log('停止当前页面下拉刷新成功'),
				})
			}
		} catch (error) {
			console.log(error)
		}
	},
	
	/**
	 * 用户下拉刷新的处理函数
	 */
	async onPullDownRefresh() {
		this.getTopMVData(0)
	},

	/**
	 * 用户上拉触底事件的处理函数
	 */
	async onReachBottom() {
		this.getTopMVData(this.data.topMVs.length)
		// if (!this.data.hasMore) return
		// const res = await getTopMV(this.data.topMVs.length)
		// this.setData({ topMVs: this.data.topMVs.concat(res.data) })
		// // this.setData({ topMVs: [...this.data.topMVs, ...res.data] })
		// this.setData({ hasMore: res.hasMore })
	},

	// 自己添加的事件处理的方法
	handleVideoItemClick(event) {
		// console.log('handleVideoItemClick invoked', event)
		const id = event.currentTarget.dataset.item.id
		wx.navigateTo({
			url: `/pages/video-detail/index?id=${id}`,
		})
	}
})