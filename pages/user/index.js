import request from "../../utils/request";

// pages/user/index.js
Page({
  data: {
    userinfo: {},
    userStaticInfo: '', // 用户活动信息集合
    miniProgramStaticInfo: [], //系统初始化数据
    activityTotaltime: 0, //志愿总时长
    activityNumber: 0 //志愿总次数
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if (Object.keys(this.data.userinfo).length === 0 || this.data.userStaticInfo === '') {
      const userInfo = wx.getStorageSync("userInfo");
      const userStaticInfo = wx.getStorageSync("userStaticInfo") || [];
      this.setData({
        userinfo: userInfo,
        activityTotaltime: userStaticInfo.volunteerDurations || 0,
        activityNumber: userStaticInfo.activityNumbers || 0
      });
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //获取用户的数据
    this.getUserStaticInfo();
    //获取系统的静态数据
    this.getMiniProgramStaticInfo();
    wx.getUserProfile({
      desc: '获取用户头像',
      success: res => {
        console.log('获取信息成功：', res.userInfo);
      },
      fail: res => {
        console.log('获取信息失败：', res);
      }
    })

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getUserStaticInfo();
  },
  getUserStaticInfo() {
    //加载用户志愿时长等信息
    request({
      url: "staticInfo/getStaticInfo",
      method: "GET",
      data: {
        "volunteerId": wx.getStorageSync("userInfo").id,
      }
    }).then(
      res => {
        //拿到用户的活动数据
        //不为空就存入缓存
        if (res.data) {
          wx.setStorageSync('userStaticInfo', res.data)
          this.setData({
            activityTotaltime: res.data.volunteerDurations || 0,
            activityNumber: res.data.activityNumbers || 0
          });
        }
      },
      err => {
        console.log(err)
      }
    )
  },
  /**
   * 这里获取的是联系青协管理员的电话以及关于我们界面的数据
   */
  getMiniProgramStaticInfo() {
    request({
      url: "miniProgram/getMiniProgramStaticInfo",
      method: "GET",
    }).then(
      res => {
        if (res.code === 200) {
          this.setData({
            miniProgramStaticInfo: res.data
          })
        }
      },
      err => {
        console.log(err);
      }
    )
  },
  /**
   * 用户打电话给管理员
   */
  callAdmin() {
    wx.makePhoneCall({
      phoneNumber: this.data.miniProgramStaticInfo.adminPhone,
    }).then(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    )
  },
  /**val
   * 页面跳转到详情页面
   */
  toContent() {
    console.log(this.data.miniProgramStaticInfo);
    let item = this.data.miniProgramStaticInfo.swiperVo;
    wx.navigateTo({
      url: '../aboutQXList/aboutQXList?title=' + item.title + "&summary=" + item.summary + "&url=" + item.url,
    })
  }
})