// pages/home/home.js
import request from "../../utils/request"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        swiper_list:[],
        storePath:'qxImages/categoryImages0/',
        defaultList: [{
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
        this.getImageList();
        //如果没有取到图片，让其显示默认图片
        if(this.data.swiper_list.length===0){
            this.setData({
                swiper_list: this.data.defaultList
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

    getImageList() {
        request({
            url: "miniProgram/getImageList",
            method: "GET",
            data: {
                "storePath": this.data.storePath
            }
        }).then(
            res => {
                if(res.code===200){
                    //发过来的字符串需要转成对象
                    let obj = JSON.parse(res.data);
                    console.log(obj.swiperList);
                    this.data.swiper_list=obj.swiperList;
                    this.setData({
                        swiper_list: obj.swiperList
                     })
                }
            },
            err => {
                console.log(res);
            }
        )
    },
    borrowUmbrella() {
        // 跳转到绑定手机的页面
        console.log(1111);
        wx.navigateTo({
            url: '../borrowUmbrella/index'
        })
    }
})