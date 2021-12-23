// pages/authorize/authorize.js
import request from "../../utils/request"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUseGetUserProfile: false,
        code: String

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log('跳转到手机绑定页面',options)
        if (wx.getUserProfile) {
            this.setData({
                canIUseGetUserProfile: true
            })
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

    },
    getUserProfile(e) {
        let _this = this;
        // 获取code
        wx.login({
            success: (res) => {
                console.log(res.code)
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
                console.log('成功获取到用户信息',res)
                // 进行注册，然后跳转到绑定手机号页面
                request({
                    url: "miniProgram/registry",
                    method: "POST",
                    data: {
                        "code": _this.data.code,
                        "rawData": res.rawData,
                        "signature": res.signature
                    }
                }).then(res => {            
                    if(res.code === 200) {
                        // 注册成功
                        console.log('注册成功')
                        console.log(res.data);
                        wx.setStorageSync('token', res.data.token)
                        wx.setStorageSync('userInfo', res.data.userInfo)
                        // 跳转到绑定手机的页面
                        wx.navigateTo({
                          url: '../telform/telform?delta=2'
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
        })
    },
    getUserInfo(e) {
        // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
})