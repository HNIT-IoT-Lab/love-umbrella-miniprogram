// components/activityList/activityList.js
Component({

    options: {    /**
        * 使用全局样式
        */
        addGlobalClass: true
    },

    /**
     * 组件的属性列表
     */
    properties: {
        list : {
            type:Array
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        activityInfo(evt) {
            let activityid = evt.currentTarget.dataset.activityid
            wx.navigateTo({
              url: `../../pages/activity/activity?activityid=${activityid}`,
            })
        },
    }
})
