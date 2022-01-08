// pages/user/index.js
Page({
  data: {
    userinfo: {},
    // 借伞数量
    collectNums: 0
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    const userInfo = wx.getStorageSync("userInfo");
    const collect = wx.getStorageSync("collect") || [];
    this.setData({
      userinfo: userInfo,
      collectNums: collect.length
    });
  },
  /**
   * 页面初始化
   */
  onlaunch: function () {

  }
})