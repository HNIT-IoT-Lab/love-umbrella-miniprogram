//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'MiHome_Store',
    userInfo: {},
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 100,
    "banner_list": [{
        "banner": [{
            "pic_url": "https://www.volunteer.fengxianhub.top/qxImages/categoryImages1/1.jpg",
          },
          {
            "pic_url": "https://www.volunteer.fengxianhub.top/qxImages/categoryImages1/2.jpg",
          },
          {
            "pic_url": "https://www.volunteer.fengxianhub.top/qxImages/categoryImages1/3.jpg",
          },
          {
            "pic_url": "https://www.volunteer.fengxianhub.top/qxImages/categoryImages1/4.jpg",
          },
          {
            "pic_url": "https://www.volunteer.fengxianhub.top/qxImages/categoryImages1/5.jpg",
          }
        ]
      },
    ],
    hotgoods: [{
        "name": "春天之家福利院支教",
        "summary": "",
        "ext_tag": "http://121.37.190.126/qxImages/categoryImages2/1.jpg",
        "pic_url": "https://www.volunteer.fengxianhub.top/qxImages/categoryImages2/1.jpg"
      },
      {
        "name": "敬老院爱心活动",
        "summary": "",
        "ext_tag": "http://static.home.mi.com/app/shop/img?id=shop_d65477ca8db6626da323554e132d7de9.png&w=420&h=240&crop=a_0_120_1080_480&t=png",
        "pic_url": "https://www.volunteer.fengxianhub.top/qxImages/categoryImages2/2.jpg",
        "url": "http://home.mi.com/shop/detail?gid=95"
      },
      {
        "name": "松林小学支教",
        "summary": "",
        "ext_tag": "http://static.home.mi.com/app/shop/img?id=shop_34699befd5c2de3a028eb987fea574e9.png&w=420&h=240&crop=a_0_120_1080_480&t=png",
        "pic_url": "https://www.volunteer.fengxianhub.top/qxImages/categoryImages2/3.jpg"
      },
      {
        "name": "交通岗爱心活动",
        "pic_url": "https://www.volunteer.fengxianhub.top/qxImages/categoryImages2/4.jpg",
        "summary": "",
        "ext_tag": "http://static.home.mi.com/app/shop/img?id=shop_86f01fa8cea034deb1dce44c0385baab.png&w=420&h=240&crop=a_0_120_1080_480&t=png"
      },
      {
        "name": "巡河净滩爱心活动",
        "summary": "",
        "ext_tag": "http://static.home.mi.com/app/shop/img?id=shop_26beb8c609406d060c57b7cdc9d2627f.png&w=420&h=240&crop=a_0_120_1080_480&t=png",
        "pic_url": "https://www.volunteer.fengxianhub.top/qxImages/categoryImages2/5.jpg",
      },
      {
        "name": "春祭",
        "summary": "",
        "pic_url": "https://www.volunteer.fengxianhub.top/qxImages/categoryImages2/6.jpg",
      }, {
        "name": "图书馆整理",
        "pic_url": "https://www.volunteer.fengxianhub.top/qxImages/categoryImages2/7.jpg",
        "summary": "",
        "ext_tag": "http://static.home.mi.com/app/shop/img?id=shop_86f01fa8cea034deb1dce44c0385baab.png&w=420&h=240&crop=a_0_120_1080_480&t=png"
      },
      {
        "name": "主题党课",
        "summary": "",
        "ext_tag": "http://static.home.mi.com/app/shop/img?id=shop_26beb8c609406d060c57b7cdc9d2627f.png&w=420&h=240&crop=a_0_120_1080_480&t=png",
        "pic_url": "https://www.volunteer.fengxianhub.top/qxImages/categoryImages2/8.jpg",
      },
      {
        "name": "三十公里毅行活动",
        "summary": "",
        "pic_url": "https://www.volunteer.fengxianhub.top/qxImages/categoryImages2/9.jpg",
      }
    ]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
})