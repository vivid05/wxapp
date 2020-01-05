// pages/detail/detail.js
import Toast from 'vant-weapp/toast/toast';
import Dialog from 'vant-weapp/dialog/dialog';
import Notify from 'vant-weapp/notify/notify';
const app = getApp()
Page({
  data: {
    playdata:{},
    show:false,
    imgUrls: [],
    isDiaabled:false,
    joinNum:0,
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
      url: `${app.globalData.api}like/like`,
      data: {
        guid: this.data.playdata.guid,
        userid:app.globalData.token,
        time: new Date().toLocaleDateString(),
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
      url: `${app.globalData.api}like/like`,
      data: {
        guid: this.data.playdata.guid,
        userid: app.globalData.token,
        time: new Date().toLocaleDateString(),
        kind: 0
      },
      method: 'post',
      success(res) {
        console.log(res)
      }
    })
  } 
},

callPhone(e) {
  wx.makePhoneCall({
    phoneNumber: e.target.dataset.phone //仅为示例，并非真实的电话号码
  })
},

joinBtn(enent){
  Dialog.confirm({
    title: '确认',
    message: '确定不会爽约哟~',
    cancelButtonText:'我再想想' 
  }).then(() => {
    // on confirm
    wx.request({
      url: `${app.globalData.api}joinplay/joinplay`,
      data: {
        guid: this.data.playdata.guid,
        userid: app.globalData.token,
        time: new Date().toLocaleDateString()
      },
      method: 'post',
      success:res=> {
        if (res.data.status == 0) {
          Toast.fail('不能重复加入!');
        } else if (res.data.status == 200) {
          //Toast.success('加入成功！')
          Notify({
            message: '加入成功，记得及时与发起人取得联系哟~',
            color: 'white',
            background: 'green',
            duration: 4000
          });
          this.setData({ joinNum: this.data.joinNum + 1 })
        }
      }
    })
    app.globalData.joinList = [...app.globalData.joinList, this.data.playdata.guid]
    this.setData({ isDiaabled: true })
  }).catch(() => {
    
  });

},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    let playdata = JSON.parse(options.play)
    if (app.globalData.joinList.includes(playdata.guid)){
      this.setData({ isDiaabled: true})
    }
    this.setData({playdata:playdata})
    this.setData({likeNum:playdata.likeNum})
    this.setData({imgUrls:playdata.imgPath})
    this.setData({joinNum:playdata.joinNum})
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