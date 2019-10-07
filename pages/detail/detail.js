// pages/detail/detail.js
Page({

  data: {
    playdata:{},
    show:false,
    imgUrls: [],
    current:0,
    userInfo: {
      avatarUrl: "",//用户头像
      nickName: "",//用户昵称
    },
    color:'',
    like:'like-o',
    likeNum:1,
    images: [
      '//ci.xiaohongshu.com/04355dba-0633-5bd0-935f-eac415854d9a?imageView2/2/w/400/q/50/format/jpg',
      '//ci.xiaohongshu.com/fd5e8941-5e03-5f33-875c-222d1861f37d?imageView2/2/w/400/q/50/format/jpg',
      '//ci.xiaohongshu.com/e4efe3e0-1384-54e2-9ffb-20928f42e4ab?imageView2/2/w/400/q/50/format/jpg',
      '//ci.xiaohongshu.com/386dfc4b-3a72-5d6b-8474-3d7252dee4db?imageView2/2/w/400/q/50/format/jpg',
      '//ci.xiaohongshu.com/1d2a4d73-80e7-5c5b-8a70-b9b73cdac62c?imageView2/2/w/400/q/50/format/jpg',
      '//ci.xiaohongshu.com/ce3de0a0-33d7-52b4-bb23-91c1df2ac321?imageView2/2/w/400/q/50/format/jpg',
      '//ci.xiaohongshu.com/7215634b-bc82-5cdc-9947-5d50ef6a4d79?imageView2/2/w/400/q/50/format/jpg',
      '//ci.xiaohongshu.com/6d749c27-72df-5346-9d35-c9babbd98e38?imageView2/2/w/400/q/50/format/jpg',
      '//ci.xiaohongshu.com/d2578cf8-b5f3-5e98-bdda-ccd093b7deb2?imageView2/2/w/400/q/50/format/jpg'
    ],

  },
//--------------------自定义函数-------------------------------------------------
previewImage(e){
  this.setData({show:true})
  this.setData({ current: e.detail.current})
},
like(){
  if(this.data.like=='like-o'){
    this.setData({likeNum:this.data.likeNum+1})
  }else{
    this.setData({ likeNum: this.data.likeNum - 1 })
  }
  this.setData({color:this.data.color==''?'red':''})
  this.setData({ like: this.data.like == 'like' ? 'like-o' : 'like'})
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let playdata = JSON.parse(options.play)
    this.setData({playdata:playdata})
    this.setData({imgUrls:playdata.imgPath})
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        var avatarUrl = 'userInfo.avatarUrl';
        var nickName = 'userInfo.nickName';
        that.setData({
          [avatarUrl]: res.userInfo.avatarUrl,
          [nickName]: res.userInfo.nickName,
        })
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