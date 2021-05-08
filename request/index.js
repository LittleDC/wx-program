export const request = (params) => {
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
  return new Promise((resolve, reject) => {
    wx.request({
      ...params, //数组展开
      url: baseUrl + params.url,
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