// pages/user/index.js
Page({
  data: {
    userinfo: {},
    // 借伞数量
    collectNums: 0,
    activityTotaltime:0,//志愿总时长
    activityNumber:0//志愿总次数
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    const userInfo = wx.getStorageSync("userInfo");
    const collect = wx.getStorageSync("collect") || [];
    this.setData({
      userinfo: userInfo,
      collectNums: collect.length,
      activityTotaltime:userInfo.activityTotaltime || 0,
      activityNumber:userInfo.activityNumber || 0
    });
  },
  /**
   * 页面初始化
   */
  onlaunch: function () {

  }
})