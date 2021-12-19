import request from "../utils/request"

function checkAuth(callBack) {
    // 判断是否登录
    if (wx.getStorageSync('token')) {
        // 用户已经登录
        callBack()
    } else {
        // 没有登录,判断是否已经授权
        wx.getSetting({
            success(res) {
                if (res.authSetting['scope.userInfo']) {
                    // 进行登录操作
                    console.log('已经授权，还未登录')
                    wx.login({
                        success: (res) => {
                            let code = res.code
                            request({
                                url: 'miniProgram/login',
                                data: {
                                    "code":code
                                },
                                method: "POST"
                            }).then(res => {
                                if(res.code === 200) {
                                    // 成功获得token,拿着token去后端获取用户信息
                                    console.log('成功获取到token：' + res)
                                    let token = res.data
                                    wx.setStorageSync('token', token)
                                    request({
                                        url: 'miniProgram/getInfo',
                                        data: {
                                            "token":token
                                        }
                                    }).then(res=>{
                                        console.log(res)
                                        if(res.code === 200) {
                                            wx.setStorageSync('userInfo', res.data)
                                            // 执行回调方法
                                            callBack()
                                        }
                                    })
                                }
                            })
                        }
                    })
                } else {
                    // 跳转到授权页面
                    console.log('未授权,跳转到授权页面')
                    wx.navigateTo({
                        url: '/pages/authorize/authorize.wxml',
                    })
                }
            }
        })
    }

}
export default checkAuth