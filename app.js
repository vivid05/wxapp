//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    //var logs = wx.getStorageSync('logs') || []
    //logs.unshift(Date.now())
    // wx.getUserInfo({
    //   success: function (res) {
    //     console.log(res)
    //     var userInfo = res.userInfo
    //     var nickName = userInfo.nickName
    //     var avatarUrl = userInfo.avatarUrl
    //     var gender = userInfo.gender //性别 0：未知、1：男、2：女
    //     var province = userInfo.province
    //     var city = userInfo.city
    //     var country = userInfo.country
    //   }
    // })
    
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          var thar=this;
          //发起网络请求
          wx.request({
            url: 'http://192.168.1.107:8000/login/login',
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
    token:'',
  },
})