import {
  request
} from "../../request/index"

Page({
  data: {
    //轮播图数组
    swiperList: []
  },

  onLoad: function (options) {
    // 发送异步请求获取轮播图数据 promise优化
    // wx.request({
    //   // url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',//problem
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     // console.log(result);
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   }
    // })

    request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata"
    }).then(result => {
      // console.log(result);
      this.setData({
        swiperList: result.data.message
      })
    })
  }
})