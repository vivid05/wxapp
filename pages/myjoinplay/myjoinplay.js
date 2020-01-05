// pages/myjoinplay/myjoinplay.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: `${app.globalData.api}getmyjoinplay/getmyjoinplay`,
      data: {
        userid: app.globalData.token
      },
      method: 'get',
      success: res => {
        console.log(res)
        let img = []
        for (var i = 0; i < res.data.length; i++) {
          img[i] = res.data[i].imgPath.split('-')
          res.data[i].imgPath = img[i]
        }
        this.setData({ images: res.data })
      }
    })
  },

  todetile(data) {
    console.log(data)
    let playdata = JSON.stringify(data.detail)
    wx.navigateTo({
      url: '../detail/detail?play=' + playdata,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})