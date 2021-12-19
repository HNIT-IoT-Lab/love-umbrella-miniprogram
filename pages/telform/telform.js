// pages/telform/telform.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        state: String,
        toastMessage: String,
        hasSendCode: false,
        countDownNum: 60

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

    bindtel() {
        console.log('绑定手机号')
    },

    closeToast() {
        setTimeout(()=>{
            this.setData({
                state: null
            })
        },1500)
    },

    formInputChange(evt) {
        console.log(evt.detail.value)
    },

    bindtel() {
        console.log('绑定手机号')
        this.setData({
            state: "success",
            toastMessage: "绑定成功"
        })
        this.closeToast()
        // 跳转到首页
        // wx.navigateBack({
        //   delta: 2
        // })
    },

    sendCode(evt) {
        console.log(evt)
        this.setData({
            hasSendCode:true
        })
        this.waitForInputCode()
    },

    waitForInputCode() {
        console.log('验证码已发送，等待输入')
        var _this = this;
        var countDownNum = _this.data.countDownNum;             // 获取倒计时初始值
        var timer = setInterval(function() {
        countDownNum -= 1;
        _this.setData({
            countDownNum: countDownNum
        })
        if(countDownNum <= -1) {
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