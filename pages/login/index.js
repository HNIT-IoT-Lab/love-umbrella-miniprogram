// pages/login/index.js
const app = getApp()
var _countDownIntervalId = -1;
import request from "../../utils/request"
Page({
  data: {
    userName: '', 
    qqNumber: '',
    studentNumber: '', 
    time: '获取验证码',
    disabled: false,
    ischeckPhoneNumber: false,
    showToast: false,
    toastMessage: String,
    state: "success",
    hasSendCode: false,
    countDownNum: 60,
    phoneNumber: "",
    code: "", 
    userInfo: ''
  },
  // 用户名
  userNameInput(e) {
    this.setData({
      userName: e.detail.value
    })
  },
  // 电话
  phoneNumberInput(e) {
    this.setData({
      phoneNumber: e.detail.value
    })
  },
  // qq号
  qqNumberInput(e) {
    this.setData({
      qqNumber: e.detail.value
    })
  },
  // 学号
  studentNumberInput(e) {
    this.setData({
      studentNumber: e.detail.value
    })
  },
  //验证码
  codeInputChange(e) {
    // 将input框内的数据实时进行记录
    this.setData({
      code: e.detail.value
    })
  },
  vertifyCodeInput(e) {
    this.setData({
      VerificationCode: e.detail.value
    })
  },

  //检查用户信息是否合法
  checkInfo() {
    let userName = this.data.userName;
    let phoneNumber = this.data.phoneNumber;
    let qqNumber = this.data.qqNumber;
    let studentNumber = this.data.studentNumber;
    let code = this.data.code;
    //用户名只能输入汉字
    if (!new RegExp("^[\u4E00-\u9FA5]+$").test(userName)) {
      wx.showModal({
        title: '提示',
        content: '请填入真实姓名',
        success: res => {
          if (res.confirm) {
            this.setData({
              userName: ''
            })
          } else {}
        }
      })
      return;
    }
    if (!(/^1[3456789]\d{9}$/.test(phoneNumber))) {
      wx.showModal({
        title: '提示',
        content: '请填入真实手机号码',
        success: res => {
          if (res.confirm) {
            this.setData({
              phoneNumber: ''
            })
          } else {}
        }
      })
      return;
    }
    if (!new RegExp("\\d{5,11}").test(qqNumber)) {
      wx.showModal({
        title: '提示',
        content: '请填入真实的qq号',
        success: res => {
          if (res.confirm) {
            this.setData({
              qqNumber: ''
            })
          } else {}
        }
      })
      return;
    }
    if (!new RegExp("\\d{11}").test(studentNumber)) {
      wx.showModal({
        title: '提示',
        content: '请填入真实的学号',
        success: res => {
          if (res.confirm) {
            this.setData({
              studentNumber: ''
            })
          } else {}
        }
      })
      return;
    }
    //通过粗略的检查后返回true
    return true;
  },
  //将用户信息存入到数据库中
  insertUserByToken(successCallBack, failCallBack, errCallBack) {
    request({
      url: "miniProgram/updateUserInfoByToken",
      method: "POST",
      data: {
        "token": wx.getStorageSync('token'),
        "phoneNumber": this.data.phoneNumber,
        "userName": this.data.userName,
        "qqNumber": this.data.qqNumber,
        "studentNumber": this.data.studentNumber
      }
    }).then(res => {
      if (res.code === 200) {
        console.log(res);
        //存入并跳转首页
        successCallBack();
      } else {
        console.log(res);
        failCallBack(res);
      }
    }).catch(err => {
      errCallBack(err);
    })
  },

  /**
   * 校验验证码的正确性
   */
  bindtel() {
    console.log('点击了绑定手机号')
    console.log('输入的手机号：' + this.data.phoneNumber)
    console.log('输入的验证码：' + this.data.code)
    if (!this.checkInfo()) {
      //用户输入数据格式不正确返回
      console.log('用户输入数据格式不正确')
      return;
    }
    // 首先本地进行校验
    if (wx.getStorageSync('phone') && wx.getStorageSync('phone') === this.data.phoneNumber) {
      if (wx.getStorageSync('code') && wx.getStorageSync('code') === this.data.code) {
        console.log('和本地验证码相符')
        //验证通过
        this.showToast("验证通过", "success")
        //将数据存入数据库中
        this.insertUserByToken(() => {
          //成功的回调
          this.showToast("绑定成功", "success")
          setTimeout(()=>{
            wx.switchTab({
              url: '../../pages/home/home',
            })
          },1000)
        }, (res) => {
          //数据更行失败的回调
          this.showToast(res.message, "fail")
        }, (err) => {
          //异常的回调
          this.showToast(err.message, "fail")
        });
      } else {
        this.showToast("验证码有误", "fail")
      }
    } else {
      this.showToast("验证码还未发送", "fail")
    }

  },
  sendCode(evt) {
    if (!this.checkInfo()) {
      //用户输入数据格式不正确返回
      console.log('用户输入数据格式不正确')
      return;
    }
    console.log(evt)
    // 调用发送验证码API
    request({
      url: "miniProgram/sendCode",
      method: "POST",
      data: {
        "phone": this.data.phoneNumber
      }
    }).then(res => {
      console.log('发送验证码请求')
      console.log(res)
      if (res.code === 200) {
        // 本地保存验证码，用于本地校验
        wx.setStorageSync('phone', this.data.phoneNumber)
        wx.setStorageSync('code', res.data)
        this.showToast("验证码发送成功", "success")
        this.setData({
          hasSendCode: true
        })
        this.showToast("发送成功", "success");
        //发送成功开始倒计时
        this.startCountDown(this.data.countDownNum)
      } else {
        // 验证码发送失败
        this.showToast(res.message, "fail")
      }
    }).catch(err => {
      console.log(err)
    })
  },


  closeToast() {
    setTimeout(() => {
      this.setData({
        showToast: false
      })
    }, 1500)
  },

  showToast(message, state) {
    this.setData({
      showToast: true,
      toastMessage: message,
      state: state
    })
    this.closeToast()
  },


  /**
   * 手机验证码倒计时
   * 发送验证码bindTap事件，按钮事件
   */
  // 开始倒计时
  startCountDown: function (currentTime) {
    var that = this;
    that.stopCountDown();
    that.setData({
      time: currentTime + 's后重发',
      disabled: true //按钮不可按
    })
    // 倒计时开始了之后 _countDownIntervalId 就会大于0，一般为1
    _countDownIntervalId = setInterval(function () {
      if (_countDownIntervalId >= 0) {
        that.setData({
          time: (currentTime - 1) + 's后重发'
        })
        currentTime--;
        if (currentTime <= 0) { //等于0表示倒计时停止了
          that.stopCountDown(); //1、字变成：获取验证码 ；2、按钮可按；3、时间变成60s
        }
      }
    }, 1000)
  },
  // 停止倒计时
  stopCountDown: function () {
    var that = this;
    if (_countDownIntervalId >= 0) {
      clearInterval(_countDownIntervalId);
      _countDownIntervalId = -1;
    }
    that.setData({ //1、字变成：获取验证码 ；2、按钮可按；3、时间变成60s
      time: '获取验证码',
      currentTime: 60,
      disabled: false
    })
  },
})