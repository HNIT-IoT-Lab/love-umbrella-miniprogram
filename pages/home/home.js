// pages/home/home.js
import request from "../../utils/request"

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    handleGet() {
        request({
            url: "user/",
            method: "get"
        }).then(res => {
            console.log(res)
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.renderSwiper()
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

    renderSwiper() {
        wx.request({
            url: 'https://api.juooo.com/home/index/getClassifyHome?city_id=0&abbreviation=&version=6.1.54&referer=2',
            method: "GET",
            success: (res) => {
                console.log(res.data.data.slide_list)
                this.setData({
                    list: res.data.data.slide_list
                })
            },
            fail: (err) => {
                // Swiper图片
                console.log('Swiper图片' + err)
            }
        })
    }
})