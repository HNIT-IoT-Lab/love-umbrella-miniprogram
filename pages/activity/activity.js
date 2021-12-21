// pages/activity/activity.js
import authCheck from "../../utils/auth"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        activityid: Number
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            activityid:  options.activityid
        })
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
    }
})