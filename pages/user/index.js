import request from "../../utils/request";

// pages/user/index.js
Page({
  data: {
    userinfo: {},
    userStaticInfo: '', // 用户活动信息集合
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
    this.getStaticInfo();
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getStaticInfo();
  },
  getStaticInfo() {
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
  }
})