function request(params) {
  // 请求数据前弹出Loading框
  // wx.showLoading({
  //   title: '加载中',
  // })
  // 将wx.request封装成Promise风格，可以使用.then和.err
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      // 将传入对象的url拼接在后面
      // url: "http://server.natappfree.cc:40961/" + params.url,
      url: "http://localhost:/" + params.url,
      success: (res) => {
        resolve(res.data)
      },
      fail: (err) => {
        reject(err)
      },
      complete() {
        // 无论请求成功与否都会隐藏Loading框
        // wx.hideLoading()
      }
    })
  })
}


export default request