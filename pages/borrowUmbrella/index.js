import authCheck from "../../utils/auth"
import request from "../../utils/request"
Page({
  data: {
    //雨伞宣传标语集合
    contentList: ['好伞用完归还，好人再借不难', '可以带我走，但必须送我回来', '送伞孩子回家，你值得点赞', '雨伞好借好还，温暖再借不难', '让我雨后回家，让爱锦上添花', '爱心伞，用后还，诚信中国人', '今日您归还，明日他方便', '雨伞属于大家，归还更显关爱', '雨中安稳从容，雨后诚信彩虹', '带走我，但是请记得送我回家', '借你挡风雨，爱心共传递'],
    content: '带走我，但是请记得送我回家', //宣传标语
    scanCode: '', //扫码保存到的结果
    innerAudioContext: null, //扫码提示声
  },
  /* 
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //加载扫码提示声
    let val = wx.createInnerAudioContext()
    val.src = 'https://www.volunteer.fengxianhub.top/qxImages/miniPrograPromptSound.mp3'
    this.setData({
      innerAudioContex: val
    })
  },

  onReady: function () {
    let that = this;
    setInterval(() => {
      let randomNumber = Math.floor(Math.random() * that.data.contentList.length);
      that.setData({
        content: that.data.contentList[randomNumber]
      })
    }, 2000)
  },
  /**
   * 扫码事件
   */
  scanCodeEvent: function (callback) {
    let that = this;
    // //让加载框消失
    wx.hideLoading()
    wx.scanCode({
      onlyFromCamera: true, // 只允许从相机扫码
      success(res) {
        //扫码提示声
        that.data.innerAudioContex ? that.data.innerAudioContex.play() : ''
        //扫码成功执行回调函数
        if (res.result !== "helloloveUmbrella") {
          wx.showModal({
            title: '提示',
            content: '二维码错误',
          })
        } else {
          //加载框
          wx.showLoading({
            title: '请关锁后离开',
          })
          callback()
        }
      }
    })
  },

  borrowUmbrella() {
    // 借伞
    //加载框
    wx.showLoading({
      title: '正在加载中',
    })
    authCheck(() => {
      // 用户已经授权且绑定手机号，让用户扫码，成功后触发回调函数
      this.scanCodeEvent(() => {
        this.borrowRequst();
      })
    }, () => {
      // 未授权的回调
      wx.navigateTo({
        url: '../authorize/authorize',
      })
    }, () => {
      // 未绑定手机号，跳转到绑定手机页面
      wx.navigateTo({
        url: '../login/index',
      })
    }, () => {
      // 登录失败的回调
      console.log('没有权限')
    })
  },

  borrowRequst() {
    request({
      url: 'umbrella/borrowUmbrellaByToken?token=' + wx.getStorageSync('token'),
      method: 'GET'
    }).then(res => {
      //让加载框消失
      wx.hideLoading()
      if (res.code === 200) {
        wx.showModal({
          title: '提示',
          content: '爱心雨伞借取成功\n请按时归还哦！',
        })
      } else if (res.code === 602) {
        wx.showModal({
          title: '提示',
          content: '您还有一把爱心雨伞未归还，请先归还',
        })
      } else if (res.code === 606) {
        //该用户没有绑定手机号
        // 未绑定手机号，跳转到绑定手机页面
        wx.navigateTo({
          url: '../login/index',
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '爱心雨伞借取失败\n服务器异常',
        })
      }
    }).catch(err => {
      //让加载框消失
      wx.hideLoading()
      wx.showModal({
        title: '提示',
        content: '爱心雨伞借取失败\n服务器异常',
      })
    })
  },

  /**
   * 还伞事件
   */
  returnUmbrella() {
    authCheck(() => {
      // 用户已经授权且绑定手机号
      //加载框
      wx.showLoading({
        title: '正在加载中',
      })
      // 用户已经授权且绑定手机号，让用户扫码，成功后触发回调函数
      this.scanCodeEvent(() => {
        this.returnRequst();
      })
    }, () => {
      // 未授权的回调
      wx.navigateTo({
        url: '../authorize/authorize',
      })
    }, () => {
      // 未绑定手机号，跳转到绑定手机页面
      wx.navigateTo({
        url: '../login/index',
      })
    }, () => {
      // 登录失败的回调
      console.log('没有权限')
    })
  },
  /**
   * 还伞请求
   */
  returnRequst() {
    request({
      url: 'umbrella/returnUmbrellaByToken?token=' + wx.getStorageSync('token'),
      method: 'GET'
    }).then(res => {
      //让加载框消失
      wx.hideLoading()
      if (res.code === 200) {
        wx.showModal({
          title: '提示',
          content: '爱心雨伞归还成功\n',
        })
      } else if (res.code === 603) {
        wx.showModal({
          title: '提示',
          content: '您还没有借取过爱心雨伞，不能借取',
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '爱心雨伞借取失败\n服务器异常',
        })
      }
    }).catch(err => {
      //让加载框消失
      wx.hideLoading()
      wx.showModal({
        title: '提示',
        content: '爱心雨伞借取失败\n服务器异常' + err,
      })
    })
  }
})