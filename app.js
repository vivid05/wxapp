//app.js
App({
  onLaunch: function () { 
    
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          var thar=this;
          //发起网络请求
          wx.request({
            url: `${this.globalData.api}login/login`,
            data: {
              code: res.code,
              Appid:'wx5d7f64288c8cba74',
              AppSecret:'ae82669d33889e2768391cb4ddc641ba'
            },
            success:res=>{
              let token=res.data;
              this.globalData.token=token;
              wx.setStorageSync('token', token)
            },
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  globalData: {
    api: 'http://192.168.1.2:8000/',
    token:'',
    joinList:[]
  },
})