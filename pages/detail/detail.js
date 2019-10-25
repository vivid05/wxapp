// pages/detail/detail.js
Page({

  data: {
    playdata:{},
    show:false,
    imgUrls: [],
    current:0,
    color:'',
    like:'like-o',
    likeNum:0,
    isLike:false
  },
//--------------------自定义函数-------------------------------------------------
previewImage(e){
  this.setData({show:true})
  this.setData({ current: e.detail.current})
},
like(){
  this.setData({ color: this.data.color == '' ? 'red' : '' })
  this.setData({ like: this.data.like == 'like' ? 'like-o' : 'like' })
  if(this.data.like=='like'){
    this.setData({likeNum:this.data.likeNum+1})
    wx.setStorage({
      key: this.data.playdata.guid,
      data: true,
    })
    wx.request({
      url: 'http://192.168.1.105:8000/like/like',
      data: {
        guid: this.data.playdata.guid,
        kind:1
      },
      method: 'post',
      success(res) {
        console.log(res)
      }
    })
  }else{
    this.setData({ likeNum: this.data.likeNum - 1 })
    wx.setStorage({
      key: this.data.playdata.guid,
      data: false,
    })
    wx.request({
      url: 'http://192.168.1.105:8000/like/like',
      data: {
        guid: this.data.playdata.guid,
        kind: 0
      },
      method: 'post',
      success(res) {
        console.log(res)
      }
    })
  }
  
  
},
joinBtn(enent){
  console.log(123)
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    let playdata = JSON.parse(options.play)
    this.setData({playdata:playdata})
    this.setData({likeNum:playdata.likeNum})
    this.setData({imgUrls:playdata.imgPath})
    wx.getStorage({
      key: playdata.guid,
      success: function(res) {
        if(res.data){
          that.setData({color:'red'})
          that.setData({like:'like'})
        }
      },
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