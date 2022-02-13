// pages/home/home.js
import request from "../../utils/request"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        swiper_list: [{
            "name": "15届16届交接图片",
            "summary": "15届16届交接图片",
            "ext_tag": "http://121.37.190.126/qxImages/categoryImages2/1.jpg",
            "pic_url": "https://www.volunteer.fengxianhub.top/qxImages/categoryImages0/1.jpg"
        },
        {
            "name": "15届理事会合影",
            "summary": "15届16届交接图片",
            "ext_tag": "http://121.37.190.126/qxImages/categoryImages2/1.jpg",
            "pic_url": "https://www.volunteer.fengxianhub.top/qxImages/categoryImages0/2.jpg"
        },
        {
            "name": "15届16届交接图片",
            "summary": "15届16届交接图片",
            "ext_tag": "http://121.37.190.126/qxImages/categoryImages2/1.jpg",
            "pic_url": "https://www.volunteer.fengxianhub.top/qxImages/categoryImages0/3.jpg"
        },
        {
            "name": "15届16届交接图片",
            "summary": "15届16届交接图片",
            "ext_tag": "http://121.37.190.126/qxImages/categoryImages2/1.jpg",
            "pic_url": "https://www.volunteer.fengxianhub.top/qxImages/categoryImages0/4.jpg"
        },
        {
            "name": "15届16届交接图片",
            "summary": "15届16届交接图片",
            "ext_tag": "http://121.37.190.126/qxImages/categoryImages2/1.jpg",
            "pic_url": "https://www.volunteer.fengxianhub.top/qxImages/categoryImages0/5.jpg"
        },
        {
            "name": "15届16届交接图片",
            "summary": "15届16届交接图片",
            "ext_tag": "http://121.37.190.126/qxImages/categoryImages2/1.jpg",
            "pic_url": "https://www.volunteer.fengxianhub.top/qxImages/categoryImages0/6.jpg"
        },
        {
            "name": "15届16届交接图片",
            "summary": "15届16届交接图片",
            "ext_tag": "http://121.37.190.126/qxImages/categoryImages2/1.jpg",
            "pic_url": "https://www.volunteer.fengxianhub.top/qxImages/categoryImages0/7.jpg"
        },
        {
            "name": "15届16届交接图片",
            "summary": "15届16届交接图片",
            "ext_tag": "http://121.37.190.126/qxImages/categoryImages2/1.jpg",
            "pic_url": "https://www.volunteer.fengxianhub.top/qxImages/categoryImages0/8.jpg"
        },
        {
            "name": "15届16届交接图片",
            "summary": "15届16届交接图片",
            "ext_tag": "http://121.37.190.126/qxImages/categoryImages2/1.jpg",
            "pic_url": "https://www.volunteer.fengxianhub.top/qxImages/categoryImages0/9.jpg"
        },
        
    ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //this.renderSwiper()
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

    // renderSwiper() {
    //     wx.request({
    //         url: 'https://api.juooo.com/home/index/getClassifyHome?city_id=0&abbreviation=&version=6.1.54&referer=2',
    //         method: "GET",
    //         success: (res) => {
    //             console.log(res.data.data.slide_list)
    //             this.setData({
    //                 list: res.data.data.slide_list
    //             })
    //         },
    //         fail: (err) => {
    //             // Swiper图片
    //             console.log('Swiper图片' + err)
    //         }
    //     })
    // },
    borrowUmbrella() {
        // 跳转到绑定手机的页面
        console.log(1111);
        wx.navigateTo({
            url: '../borrowUmbrella/index'
        })
    }
})