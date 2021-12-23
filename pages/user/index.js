// pages/user/index.js
Page({
  data: {
    userinfo:{},
    // 借伞数量
    collectNums:0
  },
  onShow(){
    const userinfo=wx.getStorageSync("userInfo");
    const collect=wx.getStorageSync("collect")||[];
    this.setData({userinfo,collectNums:collect.length});
      
  }
})