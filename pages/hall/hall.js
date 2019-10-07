// pages/hall/hall.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playdata:[],
    image: [
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
      active:0
  },
  //-----------------------------------自定义函数-----------------------------------------------
  getPlayinfo(){
    var that=this;
    wx.request({
      url: 'http://192.168.1.107:8000/getplay/getplay', 
      success(res) {
        console.log(res.data)
        var img=[]
        for(var i=0;i<res.data.length;i++){
          img[i]=res.data[i].imgPath.split('-')
          res.data[i].imgPath=img[i]
        }
        that.setData({ playdata: (res.data).reverse() })
       
      }
    })   
  },
  ontabChange(event){
    this.setData({ active: event.detail.index})
  },
  toDetail(event){
    let playdata = JSON.stringify(event.currentTarget.dataset.playdata)
    wx.navigateTo({
      url: '../detail/detail?play=' + playdata,
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPlayinfo()
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
    wx.showNavigationBarLoading()
    this.getPlayinfo()
    setTimeout(function(){
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    },800)
    
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