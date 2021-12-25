// app.js
import request from "utils/request"
App({
  //界面打开就尝试去后台拿到用户的信息
  onLaunch() {
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
                          // let phoneNumber = res.data.phoneNumber
                          // console.log('登陆成功，手机号为:',phoneNumber)
                          // // 执行回调方法
                          // if(phoneNumber) {
                          //     // 绑定过手机号
                          //     wx.setStorageSync('phone', phoneNumber)
                          //     successCallBack()
                          // } else {
                          //     // 没绑定手机号
                          //     unboundPhoneCallBack()
                          // }
                      }
                  })
              } else if(res.code === 600) {
                  // 用户未授权
                  //unauthorizedCallBack()
              } else {
                  // 登录失败
                  console.log("登录失败", res.message)
                  //failCallBack()
              }
          })
      }
  })
  },
  globalData: {
    userInfo: null
  }
})
