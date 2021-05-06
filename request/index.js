export const request = (params) => {
  return new Promise((resolve, reject) => {
    wx.request({
      ...params, //数组展开
      success: (result) => {
        // console.log(1);
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}