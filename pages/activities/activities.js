// pages/activity/activity.js
import request from "../../utils/request"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 导航栏
        navbarList: ["招募中","进行中","已结束"],
        // 记录当前页面的下标
        current: 0,
        // 招募中的活动
        activitiesInRecruiting: [],
        // 进行中的活动
        activitiesInProgress: [],
        // 已结束的活动
        activitiesHaveEnded: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
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
        this.fetchData()
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

    handleSelect(evt) {
        this.setData({
            current: evt.detail
        })
    },

    fetchData() {
        request({
            url: 'volunteerActivity/findListByStutas',
            data: {
                pageNo: 0,
                status: "01"
            },
            method: "POST"
        }).then(res => {
            console.log(res)
            if(res.code === 200) {
                console.log(res)
                let activities = []
                res.data.list.forEach(element => {
                    activities.push(element)
                });
                this.setData({
                    activitiesInRecruiting: activities
                })
            } else {
                console.log(res.message)
            }
        }).catch(err => {
            console.log(err)
        })
    }
})