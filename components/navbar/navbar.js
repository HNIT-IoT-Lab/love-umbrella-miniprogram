// components/navbar/navbar.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        list: null
    },

    /**
     * 组件的初始数据
     */
    data: {
        current: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {
        handleTap(evt) {
            this.setData({
                current: evt.currentTarget.dataset.id
            })
            this.triggerEvent("selectEvent",evt.currentTarget.dataset.id)
        }
    }
})
