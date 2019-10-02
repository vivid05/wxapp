// pages/kuaidi/kuaidi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoData:{},
    num:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  num:function(e){
    this.setData({num:e.detail.value})
    //console.log(this.data.num)
  },
  btnClick: function () {
    var that=this;
    wx.request({
      url: 'https://hd215.api.yesapi.cn/?service=App.Common_Express.Search&app_key=323C2D53A30D59F898E4251F171C637D&sign=2A4BF2C26DBEA25EB1DD9D162318BE78',
      data: {
        num: that.data.num,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({ infoData: res.data.data.items});
        //console.log(that.data.infoData)
      }
    })
  }
})