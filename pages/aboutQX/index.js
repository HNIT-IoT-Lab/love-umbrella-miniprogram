import request from "../../utils/request"
Page({
  data: {
    motto: 'MiHome_Store',
    userInfo: {},
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 100,
    swiper_list: [], //轮播图列表
    storePath: 'qxImages/categoryImages1/',//轮播图的存储路径
    content_list:[],//志愿活动列表
    ContentStorePath: 'qxImages/categoryImages2/',//志愿活动路径
    swiperList: [
    {
      summary: "",
      title: "",
      url: "https://www.volunteer.fengxianhub.top/qxImages/categoryImages1/484f43acd04544ce97b07b09083f74db.jpg",
      storePath: "qxImages/categoryImages1/"
    },
    {
      summary: "",
      title: "",
      url: "https://www.volunteer.fengxianhub.top/qxImages/categoryImages1/9183b38fdd7943e0b08208b53b4c46e1.jpg",
      storePath: "qxImages/categoryImages1/"
    },
    {
      summary: "",
      title: "",
      url: "https://www.volunteer.fengxianhub.top/qxImages/categoryImages1/92b8f797487d4d1893b25947ee80b1e4.jpg",
      storePath: "qxImages/categoryImages1/"
    },
    {
      summary: "",
      title: "",
      url: "https://www.volunteer.fengxianhub.top/qxImages/categoryImages1/20d7416ee27a4e8d9ac1743448264cea.jpg",
      storePath: "qxImages/categoryImages1/"
    },
    {
      summary: "",
      title: "",
      url: "https://www.volunteer.fengxianhub.top/qxImages/categoryImages1/dc0349eb22f346e0b232858dc96e3802.jpg",
      storePath: "qxImages/categoryImages1/"
    },
    {
      summary: "",
      title: "",
      url: "https://www.volunteer.fengxianhub.top/qxImages/categoryImages1/87b4fbb2632a461a9de08575f2a682ea.jpg",
      storePath: "qxImages/categoryImages1/"
    }],
    contentList: [{
        "title": "春天之家福利院支教",
        "summary": "",
        "url": "https://www.volunteer.fengxianhub.top/qxImages/categoryImages2/1.jpg"
      },
      {
        "title": "敬老院爱心活动",
        "summary": "",
        "url": "https://www.volunteer.fengxianhub.top/qxImages/categoryImages2/2.jpg"
      },
      {
        "title": "松林小学支教",
        "summary": "",
        "url": "https://www.volunteer.fengxianhub.top/qxImages/categoryImages2/3.jpg"
      },
      {
        "title": "交通岗爱心活动",
        "url": "https://www.volunteer.fengxianhub.top/qxImages/categoryImages2/4.jpg",
        "summary": "",
      },
      {
        "title": "巡河净滩爱心活动",
        "summary": "",
        "url": "https://www.volunteer.fengxianhub.top/qxImages/categoryImages2/5.jpg",
      },
      {
        "title": "春祭",
        "summary": "",
        "url": "https://www.volunteer.fengxianhub.top/qxImages/categoryImages2/6.jpg",
      }, {
        "title": "图书馆整理",
        "url": "https://www.volunteer.fengxianhub.top/qxImages/categoryImages2/7.jpg",
        "summary": "",
      },
      {
        "title": "主题党课",
        "summary": "",
        "url": "https://www.volunteer.fengxianhub.top/qxImages/categoryImages2/8.jpg",
      },
      {
        "title": "三十公里毅行活动",
        "summary": "",
        "url": "https://www.volunteer.fengxianhub.top/qxImages/categoryImages2/9.jpg",
      }
    ]
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {
    this.getAllList();
  },

  getAllList(){
    //回调函数里写如果请求不到数据的策略，给默认列表
    this.getImageList(() => {
      this.setData({
      swiper_list: this.data.swiperList
      })
    });
    this.getContentList(()=>{
      this.setData({
        content_list: this.data.contentList
      })
      console.log(this.data.content_list);
    })
  },

  /**
   * 从服务器拿到轮播图图片
   */
  getImageList(callback) {
    request({
      url: "miniProgram/getImageList",
      method: "GET",
      data: {
        "storePath": this.data.storePath
      }
    }).then(
      res => {
        if (res.code === 200) {
          //发过来的字符串需要转成对象
          let obj = JSON.parse(res.data);
          if (obj.swiperList.length === 0) {
            callback();
          } else {
            this.setData({
              swiper_list: obj.swiperList
            })
          }
        }
      },
      err => {
        console.log(err);
        callback();
      }
    )
  },
  /**
   * 从服务器拿到志愿活动数据
   */
  getContentList(callback){
    request({
      url: "miniProgram/getImageList",
      method: "GET",
      data: {
        "storePath": this.data.ContentStorePath
      }
    }).then(
      res => {
        if (res.code === 200) {
          //发过来的字符串需要转成对象
          let obj = JSON.parse(res.data);
          //传过来没有数据，给默认值
          if (obj.swiperList.length === 0) {
            callback();
          } else {
            this.setData({
              content_list: obj.swiperList
            })
          }
        }else{
          callback();
        }
      },
      err => {
        console.log(err);
        callback();
      }
    )
  },
  /**val
   * 页面跳转到详情页面
   */
  toContent(val){
    let item = val.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../aboutQXList/aboutQXList?title='+item.title+"&summary="+item.summary+"&url="+item.url,
    })
  }
})