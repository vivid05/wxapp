// pages/play/play.js
import myrequest from '../../server.js'
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    counter:0,
    loginFlag:''
  },
  //----------------------自定义函数-------------------------------------
  click(){
    this.setData({counter:this.data.counter+1})
  },
  bindGetUserInfo(res) {
    this.setData({loginFlag:true})
    console.log(res.detail.userInfo)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({loginFlag:app.globalData.loginFlag}) 
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          this.setData({loginFlag:true})
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
            }
          })
        } else {
          this.setData({ loginFlag: false })
        }
      }
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