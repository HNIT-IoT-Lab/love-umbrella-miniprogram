// pages/Activity_records/records.js
import request from "../../utils/request"
let timeUtils = require("../../utils/time");
let _this; //保存一下this的指向
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 上拉刷新、触底加载判断变量
    hasMoreData: true,
    isRefreshing: false,
    isLoadingMoreData: false,
    hasData:true,//判断用户是否有历史数据
    type: '', //查看历史记录类型，1表示查看活动记录、2表示查看参加活动记录
    activityRecodPageNo: 1, //用户查询活动记录页数，默认第一页
    activityRecodPageSize: 5, //用户查询参加活动记录条数，默认20条
    activityRecods: [], //参加活动记录
    timeFomter: 'Y-M-D h:m:s', //向用户展示的数据格式
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //初始化加载数据
    this.getActivityList();
    //保存一下this的指向
    _this = this;
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    if (this.data.isRefreshing || this.data.isLoadingMoreData) {
      return
    }
    _this.setData({
      isRefreshing: true,
      hasMoreData: true
    });
    //重新加载数据
    this.getActivityList();
    setTimeout(function () {
      wx.stopPullDownRefresh()
      _this.setData({
        isRefreshing: false,
        hasMoreData: true
      });
    }, 1500);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.isRefreshing || this.data.isLoadingMoreData || !this.data.hasMoreData) {
      return
    }
    _this.setData({
      isLoadingMoreData: true
    });
    //重新请求数据，每次多请求当前默认条数一般的数据，即扩容1.5倍
    let oldPageSize = this.data.borrowUmbrellaRecodPageSize;
    this.setData({
      borrowUmbrellaRecodPageSize: oldPageSize + (oldPageSize >> 1)
    })
    this.getActivityList();
    setTimeout(() => {
      _this.setData({
        isLoadingMoreData: false,
      });
    }, 1500);
  },

  /**
   * 获取用户参加活动的数据
   */
  getActivityList(){
    request({
      url: "volunteerActivity/selectUserActivityList",
      method: "GET",
      data: {
        "volunteerId": wx.getStorageSync('userInfo').id,
        "pageNo": this.data.activityRecodPageNo,
        "pageSize": this.data.activityRecodPageSize,
      }
    }).then(
      res=>{
        if(res.code === 200){
          //将data格式转成json
          let obj = JSON.parse(res.data);
          //将后端传递的参数中的时间格式化一下
          if(obj.total > 0){
            let records = this.filterData(obj.list);
            //将数据存储
            this.setData({
              activityRecods:records,
              hasData: false
            })
          }
        }else {
          console.log(res);
          wx.showModal({
            title: '提示',
            content: '服务器异常' + res,
          })
        }
      },
      err=>{
        console.log(err);
          wx.showModal({
            title: '提示',
            content: '服务器异常' + err,
          })
      }
    )
  },
    /**
   * 将用户数据里的时间戳转换格式
   * @param {用户的记录集合} obj 
   */
  filterData(obj) {
    obj.forEach(e => {
      e.startTime = timeUtils.tsFormatTime(e.startTime, this.data.timeFomter);
      e.endTime = timeUtils.tsFormatTime(e.endTime, this.data.timeFomter);
    })
    //返回格式化时间后的对象
    return obj;
  }
})