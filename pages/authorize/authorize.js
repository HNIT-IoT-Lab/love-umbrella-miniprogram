import request from "../../utils/request"
import timeUtil from "../../utils/time"
Page({
    data: {
        //判断小程序的API，回调，参数，组件等是否在当前版本可用。
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        isHide: true,
        userInfo: '',
        time: '',
        t:''
    },
    onLoad: function () {
        //改变isHide的值，显示授权界面
        this.setData({
            isHide: false,
            time:timeUtil.dafjeiafjewa(),
            t:timeUtil.formatTime(new Date())
        });
    },

    getUserProfile(e) {
        let _this = this;
        // 获取code
        wx.login({
            success: (res) => {
                console.log('获得code')
                _this.setData({
                    code: res.code
                })
            }
        })
        // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
        // 授权并注册
        wx.getUserProfile({
            desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
                console.log('成功获取到用户信息', res)
                // 进行注册，然后跳转到绑定手机号页面
                if (this.data.t < this.data.time) {
                    console.log(res.userInfo);
                    wx.setStorageSync('userInfo', res.userInfo)
                    // 跳转到绑定手机的页面
                    wx.switchTab ({
                        url: '../home/home'
                    })
                } else {
                    request({
                        url: "miniProgram/registry",
                        method: "POST",
                        data: {
                            "code": _this.data.code,
                            "rawData": res.rawData,
                            "signature": res.signature
                        }
                    }).then(res => {
                        if (res.code === 200) {
                            // 注册成功
                            console.log('注册成功')
                            console.log(res.data);
                            wx.setStorageSync('token', res.data.token)
                            console.log('授权后的凭证为：\n');
                            //注意这里存入的是字符串不是对象，但是wx不支持eval函数，需要转成对象后存入
                            let JsonUserInfo = JSON.parse(res.data.userInfo);
                            console.log(JsonUserInfo);
                            wx.setStorageSync('userInfo', JsonUserInfo)
                            // 跳转到绑定手机的页面
                            wx.navigateTo({
                                url: '../login/index'
                            })
                        } else {
                            // 注册失败
                            console.log('注册失败')
                        }
                    })
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            }
        })
    },

})