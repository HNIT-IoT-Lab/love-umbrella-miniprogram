// pages/historical_records/records.js
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
    hasData: true, //判断用户是否有历史数据
    type: '', //查看历史记录类型，1表示查看活动记录、2表示查看借伞记录
    borrowUmbrellaRecodPageNo: 1, //用户查询借伞记录页数，默认第一页
    borrowUmbrellaRecodPageSize: 5, //用户查询借伞记录条数，默认20条
    borrowUmbrellaRecods: [], //借伞记录
    timeFomter: 'Y-M-D h:m:s', //向用户展示的数据格式
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //加载下数据
    this.getUserBorrowUmbrellaRecods()

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
    if (this.data.isRefreshing || this.data.isLoadingMoreData) {
      return
    }
    _this.setData({
      isRefreshing: true,
      hasMoreData: true
    });
    //重新加载数据
    this.getUserBorrowUmbrellaRecods();
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
    this.getUserBorrowUmbrellaRecods();
    setTimeout(() => {
      _this.setData({
        isLoadingMoreData: false,
      });
    }, 1500);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 获取用户借伞的历史记录
   */
  getUserBorrowUmbrellaRecods() {
    request({
      url: "umbrella/selectVolunteerHistoryBorrow",
      method: "GET",
      data: {
        "token": wx.getStorageSync('token'),
        "pageNo": this.data.borrowUmbrellaRecodPageNo,
        "pageSize": this.data.borrowUmbrellaRecodPageSize,
      }
    }).then(
      res => {
        if (res.code === 200) {
          //将得到数据里的时间戳转换格式
          if (res.data.Total > 0) {
            let records = this.filterData(res.data.records);
            //将数据设置设置到本地
            this.setData({
              borrowUmbrellaRecods: records,
              hasData: false
            })
          }
        } else {
          console.log(res);
          wx.showModal({
            title: '提示',
            content: '服务器异常' + res,
          })
        }
      },
      err => {
        console.log(err);
      }
    )
  },
  /**
   * 将用户数据里的时间戳转换格式
   * @param {用户的记录集合} obj 
   */
  filterData(obj) {
    obj.forEach(e => {
      e.borrowDate = timeUtils.tsFormatTime(e.borrowDate, this.data.timeFomter);
      e.returnDate = timeUtils.tsFormatTime(e.returnDate, this.data.timeFomter);
      e.borrowStatus = e.borrowStatus === 0 ? "已归还" : "未归还"
    })
    //返回格式化时间后的对象
    return obj;
  }

})