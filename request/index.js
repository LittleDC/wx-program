let ajaxTimes = 0;

export const request = (params) => {
  ajaxTimes++;
  //显示加载中效果
  wx.showLoading({
    title: '加载中',
    mask: true,
  });

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
      },
      complete: () => {
        ajaxTimes--;
        if (ajaxTimes === 0) {
          wx.hideLoading();
        }
      }
    })
  })
}