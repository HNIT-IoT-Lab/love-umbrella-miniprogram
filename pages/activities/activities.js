// pages/activity/activity.js
import request from "../../utils/request"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 导航栏
        navbarList: ["招募中","进行中","已结束"],
        // 记录当前页面的下标（显示的页面）
        current: 0,
        // 招募中的活动
        activitiesInRecruiting: [],
        // 进行中的活动
        activitiesInProgress: [],
        // 已结束的活动
        activitiesHaveEnded: [],
        // 记录三种活动的页号
        pageNo1: 1,
        pageNo2: 1,
        pageNo3: 1,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.fetchData()
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
        this.fetchData()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        let current = this.data.current
        // 分页查询对用的活动的数据
        // 活动类型
        let type;
        let pageNo;
        if(current === 0) {
            type = "00"
            pageNo = this.data.pageNo1 + 1
        } else if (current === 1) {
            type = "01"
            pageNo = this.data.pageNo2 + 1
        } else if (current === 2) {
            type = "02"
            pageNo = this.data.pageNo3 + 1
        }
        // 对应的页号
        this.getMoreActivities(type, pageNo)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    handleSelect(evt) {
        this.setData({
            current: evt.detail
        })
    },

    getMoreActivities(type, pageNo) {
        let _this = this;
        request({
            url: 'volunteerActivity/findListByStutas',
            data: {
                pageNo: pageNo,
                status: type
            },
            method: "POST"
        }).then(res => {
            if(res.code === 200) {
                if(res.data.list.length > 0) {
                    let oldList
                    let oldPageNo
                    if(type==="01") {
                        oldList = _this.data.activitiesInRecruiting
                        oldPageNo = _this.data.pageNo1
                        _this.setData({
                            activitiesInRecruiting: oldList.concat(res.data.list),
                            pageNo1: oldPageNo + 1
                        })
                    } else if(type==="00") {
                        oldList = _this.data.activitiesInProgress
                        oldPageNo = _this.data.pageNo2
                        _this.setData({
                            activitiesInProgress: oldList.concat(res.data.list),
                            pageNo2: oldPageNo + 1
                        })
                    } else if(type==="02") {
                        oldList = _this.data.activitiesHaveEnded
                        oldPageNo = _this.data.pageNo3
                        _this.setData({
                            activitiesHaveEnded: oldList.concat(res.data.list),
                            pageNo3: oldPageNo + 1
                        })
                    }
                } else {
                    console.log('没有更多数据了')
                }
            }
        }).catch(err => {
            console.log(err)
        })
    },
    
    /**
     * 根据活动类型初始化活动列表
     * @param {活动类型} type 
     */
    initListDataByType(type) {
        request({
            url: 'volunteerActivity/findListByStutas',
            data: {
                pageNo: 1,
                status: type
            },
            method: "POST"
        }).then(res => {
            if(res.code === 200) {
                console.log(res)
                let activities = []
                res.data.list.forEach(element => {
                    activities.push(element)
                });
                if(type === "01") { // 招募中的活动
                    this.setData({
                        activitiesInRecruiting: activities
                    })
                }else if(type === "00") { // 进行中的活动
                    this.setData({
                        activitiesInProgress: activities
                    })
                }else if(type === "02") { // 已结束的活动
                    this.setData({
                        activitiesHaveEnded: activities
                    })
                }
            } else {
                console.log(res.message)
            }
        }).catch(err => {
            console.log(err)
        })
    },

    /**
     * 初始化数据
     */
    fetchData() {
        // 招募中的活动
        // 状态【00:进行中，01:未开始，02:已结束】
        // 查询三种活动的活动列表信息
        this.initListDataByType("00")
        this.initListDataByType("01")
        this.initListDataByType("02")
    },
    
})