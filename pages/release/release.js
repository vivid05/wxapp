// pages/release/release.js
import Toast from 'vant-weapp/toast/toast';
const app = getApp()
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
    username:'',
    userimg:'',
    theme:'',
    place:'',
    wechat:'',
    date:new Date().toLocaleDateString(),
    time:new Date().toLocaleTimeString(),
    personNum:1,
    guid:'',
    userid:''
  },
  //-----------------自定义事件函数-----------------------------------------------
  newGuid(){
    var guid  =  "";
    for (var i  =  1;  i <=  32;  i++){
    var  n  =  Math.floor(Math.random() * 16.0).toString(16);
    guid  +=    n;
    if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
        guid  +=  "-";
    }
      return  guid;    
  },

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
      for(let i=0;i<files.tempFilePaths.length;i++){
        wx.uploadFile({
          url: `${app.globalData.api}upload/img`, //仅为示例，非真实的接口地址
          formData: {
            'guid': this.data.guid,
            'userid': this.data.userid
          },
          filePath: files.tempFilePaths[i],
          name: 'test',
          success(res) {
            console.log(res)
            var urls = { url: files.tempFilePaths[i] } 
            that.setData({ files: that.data.files.concat(urls) })
            resolve(files);

          },
          fail: function (err) {
            reject(err)
          }
        })
      }
      
    })
  },
  uploadError(e) {
    console.log('upload error', e.detail)
  },
  uploadSuccess(e) {
    console.log('upload success', e.detail)
  },
  
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
  getwechat(e){
    this.setData({wechat:e.detail.value})
  },
  onNumChange(event){
    this.setData({personNum:event.detail})
  },
  confirmBtn(){
    wx.request({
      url: `${app.globalData.api}creatplay/creatplay`, //仅为示例，并非真实的接口地址
      data: {
        redio:this.data.radio,
        theme:this.data.theme,
        date:this.data.date,
        time:this.data.time,
        place:this.data.place,
        wechat:this.data.wechat,
        personNum:this.data.personNum,
        guid:this.data.guid,
        username:this.data.username,
        userid:this.data.userid,
        userimg:this.data.userimg
      },
      method:'post',
      success(res) {
        console.log(res.data)
        if(res.data.status==200){
          Toast.success('提交成功');
        }else{
          Toast.fail('连接服务器失败');
        }   
      },
      fail(err){
        Toast.fail('提交失败');
      }
    })
    
  },
//---------------------------------------------------------------
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    this.setData({ guid: this.newGuid()});
    wx.getStorage({
      key: 'token',
      success: function(res) {
        that.setData({userid:res.data})
      },
    })
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              //console.log(res.userInfo)
              that.setData({ username: res.userInfo.nickName})
              that.setData({ userimg: res.userInfo.avatarUrl })
            }
          })
        }
      }
    })
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