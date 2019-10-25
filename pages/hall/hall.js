// pages/hall/hall.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playdata:[],
    play_item:[],
    active: 0, 
  },
  //-----------------------------------自定义函数-----------------------------------------------
  getPlayinfo(redio){
    var that=this;
    wx.request({
      url: `http://192.168.1.105:8000/getplay/getplay?redio=${redio}`, 
      success(res) {
        console.log(res.data)
        var img=[]
        for(var i=0;i<res.data.length;i++){
          img[i]=res.data[i].imgPath.split('-')
          res.data[i].imgPath=img[i]
        }
        that.setData({ playdata: (res.data).reverse() })
       return true;
      }
    })   
  },
  ontabChange(event){
    let num = event.detail.index
    this.setData({active:num})
    if(num==0){
      this.getPlayinfo()
    }else{
      this.getPlayinfo(event.detail.index-1)
    }   
  },
  onRefresh() {
    if (this.data.active == 0) {
      this.getPlayinfo()
    } else {
      this.getPlayinfo(this.data.active - 1)
    }
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
    this.getPlayinfo()
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
    //wx.showNavigationBarLoading()
    this.onRefresh()
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