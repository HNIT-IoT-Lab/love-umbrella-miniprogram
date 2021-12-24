// pages/telform/telform.js
import request from "../../utils/request"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        showToast: false,
        toastMessage: String,
        state: "success",
        hasSendCode: false,
        countDownNum: 60,
        phoneNumber: "",
        code: "",
        userInfo: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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


    closeToast() {
        setTimeout(() => {
            this.setData({
                showToast: false
            })
        }, 1500)
    },

    showToast(message, state) {
        this.setData({
            showToast: true,
            toastMessage: message,
            state: state
        })
        this.closeToast()
    },

    phoneInputChange(evt) {
        // 将input框内的数据实时进行记录
        this.setData({
            phoneNumber: evt.detail.value
        })
    },

    codeInputChange(evt) {
        // 将input框内的数据实时进行记录
        this.setData({
            code: evt.detail.value
        })
    },

    bindtel() {
        console.log('点击了绑定手机号')
        console.log('输入的手机号：' + this.data.phoneNumber)
        console.log('输入的验证码：' + this.data.code)
        let that = this;
        // 首先本地进行校验
        if (wx.getStorageSync('phone') && wx.getStorageSync('phone') === this.data.phoneNumber) {
            if (wx.getStorageSync('code') && wx.getStorageSync('code') === this.data.code) {
                console.log('和本地验证码相符')
                request({
                    url: "miniProgram/saveUserPhoneNumber",
                    method: "POST",
                    data: {
                        "token": wx.getStorageSync('token'),
                        "PhoneNumber": that.data.phoneNumber
                    }
                }).then(res => {
                    if (res.code == 200) {
                        console.log(res);
                        //存入并跳转首页
                        this.showToast("绑定成功", "success")
                        wx.switchTab({
                            url: '../../pages/home/home',
                        })
                    } else {
                        console.log(res);
                        this.showToast(res.message, "fail")
                    }
                }).catch(err => {
                    console.log(err)
                })

            } else {
                this.showToast("验证码有误", "fail")
            }
        } else {
            this.showToast("验证码还未发送", "fail")
        }

    },

    sendCode(evt) {
        console.log(evt)
        /// TODO 调用发送验证码API
        request({
            url: "miniProgram/sendCode",
            method: "POST",
            data: {
                "phone": this.data.phoneNumber
            }
        }).then(res => {
            console.log('发送验证码请求')
            console.log(res)
            if (res.code === 200) {
                // 本地保存验证码，用于本地校验
                wx.setStorageSync('phone', this.data.phoneNumber)
                wx.setStorageSync('code', res.data)
                this.showToast("验证码发送成功", "success")
                this.setData({
                    hasSendCode: true
                })
                this.waitForInputCode()
            } else {
                // 验证码发送失败
                this.showToast(res.message, "fail")
            }
        }).catch(err => {
            console.log(err)
        })
    },

    waitForInputCode() {
        console.log('验证码已发送，等待输入')
        var _this = this;
        // 获取倒计时初始值
        var countDownNum = _this.data.countDownNum;
        var timer = setInterval(function () {
            countDownNum -= 1;
            _this.setData({
                countDownNum: countDownNum
            })
            if (countDownNum <= -1) {
                //取消setInterval函数
                clearInterval(timer);
                // 重置数据，便于后续使用
                _this.setData({
                    countDownNum: 60,
                    hasSendCode: false
                })

            }
        }, 1000)
    }
})