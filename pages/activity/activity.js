// pages/activity/activity.js
import authCheck from "../../utils/auth"
import request from "../../utils/request"
import {tsFormatTime} from "../../utils/time"
import timeUtil from "../../utils/time"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        activityid: Number,
        alreadySignUp: false,
        activityInfo: Object,
        showToast: false,
        state: "success",
        toastMessage: String,
        signUpList: Array,
        // 是否可以报名
        canSignUp: true,
        // 是否已经签到
        hasSignIn: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            activityid:  options.activityid
        });
        this.fetchData();
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

    closeToast() {
        setTimeout(()=>{
            this.setData({
                showToast: false
            })
        },1500)
    },

    showToast(message,state) {
        this.setData({
            showToast: true,
            toastMessage: message,
            state: state
        })
        this.closeToast()
    },

    /**
     * 权限检查
     */
    authPreCheck(successCallBack) {
        if(timeUtil.dafjeiafjewa() > timeUtil.formatTime(new Date())){
            return;
        }
        authCheck(() =>  {
            // 用户已经授权且绑定手机号
            // 调用成功的回调
            successCallBack();
        },() => {
            // 未授权的回调
            wx.navigateTo({
              url: '../authorize/authorize',
            })
        },() => {
            // 未绑定手机号，跳转到绑定手机页面
            wx.navigateTo({
              url: '../login/index',
            })
        }
        ,() => {
            // 登录失败的回调
            console.log('没有权限')
        })
    },

    /**
     * 获取活动详细信息
     */
    fetchData() {
        let _this = this
        // 获取活动数据
        request({
            url: "volunteerActivity/getActivityInfo",
            data: {
                "id": _this.data.activityid
            }
        }).then(res => {
            if(res.code === 200) {
                res.data.startTime = tsFormatTime(res.data.startTime,'Y-M-D h:m:s');
                res.data.endTime = tsFormatTime(res.data.endTime,'Y-M-D h:m:s');
                _this.setData({
                    activityInfo: res.data
                })
                
                _this.checkNumberOfSignUp()
            } else {
                // 数据请求失败
                _this.showToast(res.message,"fail")
            }
        }).catch(err => {
            // 出现异常
            _this.showToast("网络异常","fail")
            console.log(err)
        })

        // 如果用户已经登录了，获取用户是否报名的数据
        if(wx.getStorageSync('token')) {
            request({
                url: "signUpRecord/checkState",
                method: "POST",
                data: {
                    "token": wx.getStorageSync('token'),
                    "activityId": this.data.activityid
                }
            }).then(res => {
                if(res.code === 200) {
                    this.setData({
                        alreadySignUp: res.data
                    })
                } else {
                    // 暂时不需要提示
                    //this.showToast(res.message,"fail")
                }
            })
        }

        /**
         * 获取已报名志愿者列表
         */
        request({
            url: "volunteerActivity/getSignUpList",
            data: {
                "activityId": _this.data.activityid
            }
        }).then(res => {
            if(res.code === 200) {
                _this.setData({
                    signUpList: res.data
                })
                _this.checkSignInStatus(res.data);
            }
        })
    },

    // 检查报名人数是否已经满了
    checkNumberOfSignUp() {
        let activitiyInfo = this.data.activityInfo;
        if(activitiyInfo) {
            if(activitiyInfo.numberOfAttendees != undefined && activitiyInfo.numberOfNeed != undefined) {
                if(activitiyInfo.numberOfAttendees >= activitiyInfo.numberOfNeed) {
                    this.setData({
                        canSignUp: false
                    })
                }
            }
        }
    },

    /**
     * 志愿者报名
     */
    signUpEvent()  {
        let _this = this
        this.authPreCheck(()=>{
            // 调用报名接口
            _this.doSignUp()
        });
    },

    /**
     * 打开打电话功能
     */
    phoneCall(evt) {
        let phoneNumber = evt.currentTarget.dataset.phonenumber;
        if(phoneNumber === ''){
            wx.showModal({
              title:'提示',
              content:'抱歉，该活动没有负责人'
            })
            return;
        }
        wx.makePhoneCall({
            phoneNumber: evt.currentTarget.dataset.phonenumber
        })
    },

    doSignUp() {
        request({
            url: "signUpRecord/signUpActivity",
            method: "POST",
            data: {
                "token": wx.getStorageSync('token'),
                "activityId": this.data.activityid
            }
        }).then(res => {
            console.log(res)
            if(res.code === 200) {
                this.showToast("报名成功","success")
                this.setData({
                    alreadySignUp: true
                })
                this.fetchData()
            } else {
                if(res.code === 601) {
                    this.setData({
                        alreadySignUp: true
                    })
                }
                this.showToast(res.message,"fail")
            }
        })
    },

    /**
     * 扫一扫签到事件
     */
    signInEvent(evt) {
        let _this = this;
        _this.authPreCheck(()=>{
            _this.signIn(evt);
        });
    },

    /**
     * 签到
     */
    signIn(evt) {
        // 当前活动的ID
        console.log(evt);
        const curActivityId = evt.currentTarget.dataset.activityid;

        // 允许从相机和相册扫码
        wx.scanCode({
            // 是否只能从相机扫码，不允许从相册选择图片
            onlyFromCamera: false,
            // 扫码类型(二维码)
            scanType: ['qrCode'],
            // 扫码结果处理
            success: res => this.resolvQrCode(res.result,curActivityId),
            fail: (e) => {
                console.log(e);
                if (e && e.errMsg && e.errMsg.indexOf('scanCode:fail cancel') != -1) {
                    return;
                }
                wx.showToast({ title: '扫码失败', icon: 'none', });
            }
        });
    },

    /** 
     * 开启扫一扫解析二维码内容
     */
    resolvQrCode(content,curActivityId) {
        console.log('二维码内容：' + content);
        // 二维码内容前缀
        const preFix = 'hg_volunteer_sign_in:';
        // 检查是否有内容
        if (!content || !content.lastIndexOf) {
            wx.showToast({ title: '二维码错误', icon: 'none', duration: 2000 });
            return;
        }
        // 检查格式
        if (content.lastIndexOf(preFix) != -1) {
            // 截取活动ID
            const activityId = content.substr(21);
            if(!activityId) {
                wx.showToast({ title: '二维码错误', icon: 'none', duration: 2000 });
                return;
            }
            // 判断是否是当前活动的ID
            if(activityId != curActivityId) {
                wx.showToast({ title: '请扫描对应活动的签到码', icon: 'none', duration: 2000 });
                return;
            }
            // 报名活动
            this.doSignIn(activityId);
        }
    },

    /**
     * 发起签到请求
     */
    doSignIn(activityId) {
        let userInfo = wx.getStorageSync('userInfo');
        console.log('志愿者ID: ' + userInfo.id + '签到的活动ID: ' + + activityId);
        request({
            url: 'volunteerActivity/signIn',
            method: 'POST',
            data: {
                "volunteerId": userInfo.id,
                "activityId": activityId
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded' // Form表单格式
            }
        }).then(response=>{
            if(response.code === 200) {
                wx.showToast({ title: '签到成功', icon: 'none', duration: 2000 });
                this.setData({
                    hasSignIn: true
                })
            }
            console.log(response);
        }).catch(err=>{
            console.log(err);
        })
    },

    /**
     * 检查是否已经签到过
     */
    checkSignInStatus(signUpList) {
        let _this = this;
        _this.authPreCheck(()=>{
            const userInfo = wx.getStorageSync('userInfo');
            // 判断当前用户是已经否登陆
            if(userInfo) {
                for(let i = 0,len = signUpList.length; i < len; i++) {
                    if(signUpList[i].id == userInfo.id) {
                        if(signUpList[i].isSignIn === 1) {
                            _this.setData({
                                hasSignIn: true
                            })
                            return;
                        }
                    }
                }
            }
        });
        
    },

    /**
     * 取消报名事件
     */
    cancelEvent() {
        let _this = this;
        _this.authPreCheck(()=>{
            _this.doCancel();
        });
    },

    /**
     * 发起取消报名请求
     */
    doCancel() {
        let _this = this;
        const token = wx.getStorageSync('token');
        // 判断当前用户是已经否登陆
        if(token) {
            let activityId = _this.data.activityid;
            request({
                url: 'signUpRecord/cancelRegistration',
                method: 'POST',
                data: {
                    'token': token,
                    'activityId': activityId
                }
            }).then(response=>{
                console.log(response);
                if(response.code === 200) {
                    wx.showToast({ title: '已取消报名', icon: 'none', duration: 2000 });
                    _this.setData({
                        canSignUp: true,
                        alreadySignUp: false
                    });
                    setTimeout(()=>{
                        _this.fetchData();
                    },500);
                } else {
                    wx.showToast({ title: '取消失败，请稍后重试', icon: 'none', duration: 2000 });
                }
            }).catch(err=>{
                console.log(err);
            })
        }
    }
})