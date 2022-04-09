import request from "../utils/request"
function volunteerLogin(successCallBack) {
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
              if (phoneNumber) {
                // 绑定过手机号
                wx.setStorageSync('phone', phoneNumber)
                successCallBack('手机为:' + phoneNumber);
              }
            }
          })
        } else {
          console.log("登录失败", res.message)
        }
      })
    }
  })
}

export default volunteerLogin