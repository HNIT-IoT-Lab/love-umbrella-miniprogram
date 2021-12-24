// pages/activity/activity.js
import authCheck from "../../utils/auth"
import request from "../../utils/request"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        activityid: Number,
        alreadySignUp: false,
        activityInfo: Object,
        showToast: false,
        state: "success",
        toastMessage: String
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            activityid:  options.activityid
        })
        this.fetchData()
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
        setTimeout(()=>{
            this.setData({
                showToast: false
            })
        },1500)
    },

    showToast(message,state) {
        this.setData({
            showToast: true,
            toastMessage: message,
            state: state
        })
        this.closeToast()
    },

    fetchData() {
        let _this = this
        // 获取活动数据
        request({
            url: "volunteerActivity/getActivityInfo",
            data: {
                "id": _this.data.activityid
            }
        }).then(res => {
            console.log(res)
            if(res.code === 200) {
                _this.setData({
                    activityInfo: res.data
                })
            } else {
                // 数据请求失败
                showToast(res.message,"fail")
            }
        }).catch(err => {
            // 出现异常
            showToast("网络异常","fail")
            console.log(err)
        })

        // 获取用户是否报名的数据
    },

    /**
     * 志愿者报名
     */
    signUpEvent()  {
        authCheck(() =>  {
            // 已经登录成功的回调
            console.log('报名成功')
            // 调用报名接口
        },() => {
            // 未授权的回调
            wx.navigateTo({
              url: '../authorize/authorize',
            })
        },() => {
            // 未绑定手机号，跳转到绑定手机页面
            wx.navigateTo({
              url: '../telform/telform',
            })
        }
        ,() => {
            // 登录失败的回调
            console.log('没有权限')
        })
    },

    phoneCall(evt) {
        console.log(evt)
        wx.makePhoneCall({
            phoneNumber: evt.currentTarget.dataset.phonenumber
        })
    }
})