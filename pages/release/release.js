// pages/release/release.js
import Toast from 'vant-weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files:[],
    radio: '1',
    icon: [
      {
      normal: '../../images/game.png',
      active: '../../images/game1.png'
      },
      {
        normal: '../../images/sport.png',
        active: '../../images/sport1.png'
      },
      {
        normal: '../../images/sing.png',
        active: '../../images/sing1.png'
      },
      {
        normal: '../../images/movie.png',
        active: '../../images/movie1.png'
      },
      {
        normal: '../../images/eat.png',
        active: '../../images/eat1.png'
      },
      {
        normal: '../../images/other.png',
        active: '../../images/other1.png'
      }
    ],
    theme:'',
    place:'',
    date:new Date().toLocaleDateString(),
    time:new Date().toLocaleTimeString(),
    personNum:1,
  },
  //-----------------自定义事件函数-----------------------------------------------
  // chooseImage: function (e) {
  //   var that = this;
  //   wx.chooseImage({
  //     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
  //     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
  //     success: function (res) {
  //       // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
  //       console.log(123)
  //       that.setData({
  //         files: that.data.files.concat(res.tempFilePaths)
  //       });
  //       const tempFilePaths = res.tempFilePaths;
  //     },
  //     fail:function(err){
  //       console.log(err)
  //     }
  //   })
  // },
  previewImage: function (e) {
    
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files.url // 需要预览的图片http链接列表
    })
  },
  selectFile(files) {
    //console.log('files', files)
    // 返回false可以阻止某次文件上传
  },
  uplaodFile(files) {
    //console.log('upload files', files)
    // 文件上传的函数，返回一个promise
    var that=this;
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: 'http://localhost:8000/upload/img', //仅为示例，非真实的接口地址
        filePath: files.tempFilePaths[0],
        name: 'test',
        success(res) {
          var urls = { url: files.tempFilePaths[0]}
          console.log(urls)
          var data=JSON.parse(res.data)
          that.setData({files:that.data.files.concat(urls)})
          resolve(urls);
          
        },
        fail:function(err){
          reject(err)
        }
      })
    })
  },
  uploadError(e) {
    console.log('upload error', e.detail)
  },
  uploadSuccess(e) {
    console.log('upload success', e.detail)
  },
  //---------------------------------------------------------------
  onChange(event) {
    console.log(event.detail)
    this.setData({
      radio: event.detail
    });
  },
  getTheme(event){
    this.setData({theme:event.detail.value})
  },
  bindDateChange(event){
    this.setData({date:event.detail.value})
  },
  bindTimeChange(event){
    this.setData({ time: event.detail.value })
  },
  getplace(event){
    this.setData({place:event.detail.value})
  },
  onNumChange(event){
    this.setData({personNum:event.detail})
  },
  confirmBtn(){
    Toast.success('提交成功');
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      selectFile: this.selectFile.bind(this),
      uplaodFile: this.uplaodFile.bind(this)
    })
    let kind=options.kind;
    switch(kind){
      case '电竞':
        this.setData({radio:'1'});
        break;
      case '运动':
        this.setData({ radio: '2' });
        break;
      case '唱歌':
        this.setData({ radio: '3' });
        break;
      case '电影':
        this.setData({ radio: '4' });
        break;
      case '吃饭':
        this.setData({ radio: '5' });
        break;
      case '其他':
        this.setData({ radio: '6' });
        break;
      
    }
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