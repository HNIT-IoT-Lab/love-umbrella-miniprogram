// app.js
import request from "utils/request"
App({
  //界面打开就尝试去后台拿到用户的信息
  onLaunch() {
    if(wx.getStorageSync('token')) {
        // 检查本地的token是否已经过期
        request({
            url: "miniProgram/checkLoginState",
            method: "POST",
            data: {
                "token": wx.getStorageSync('token')
            }
        }).then(res => {
            // 只有没有过期才不会删除token
            if(res.code !== 200 || res.data == false) {
                console.log('本地token已过期,将会被删除')
                // 删除本地的token等信息
                wx.removeStorageSync('token');
                wx.removeStorageSync('userInfo');
                wx.removeStorageSync('phone');
                wx.removeStorageSync('code');
            }
        }).catch(err => {
            // 如果因为网络等问题，请求发送失败，也要删除本地的token等信息
            wx.removeStorageSync('token');
            wx.removeStorageSync('userInfo');
            wx.removeStorageSync('phone');
            wx.removeStorageSync('code');
            console.log('出现异常：',err)
        })
    }
    // 展示本地存储能力
    wx.login({
      success: (res) => {
          console.log(res.code)
          // 成功获取到code
          let code = res.code;
          request({
              url: 'miniProgram/login',
              data: {
                  "code": code
              },
              method: "POST"
          }).then(res => {
              console.log(res)
              if (res.code === 200) {
                  // 登录成功,获得token,拿着token去后端获取用户信息
                  console.log('成功获取到token：' + res)
                  let token = res.data
                  wx.setStorageSync('token', token)
                  request({
                      url: 'miniProgram/getInfo',
                      data: {
                          "token": token
                      }
                  }).then(res => {
                      console.log(res)
                      if (res.code === 200) {
                          wx.setStorageSync('userInfo', res.data)
                          let phoneNumber = res.data.phoneNumber
                          if(phoneNumber) {
                              // 绑定过手机号
                              wx.setStorageSync('phone', phoneNumber)
                              successCallBack()
                          }
                      }
                  })
              } else {
                  console.log("登录失败", res.message)
              }
          })
      }
  })
  },
  globalData: {
    userInfo: null
  }
})
