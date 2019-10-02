export default function myrequest(option){
  return new Promise((resole, reject)=>{
    wx.request({
      url: option.url,
      method:option.method || 'get',
      data:option.data || {},
      success:function(res){
        resole(res);
      },
      fail:function(err){
        reject(err)
      }
    })
  })
}