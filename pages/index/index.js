import {
  request
} from "../../request/index"

Page({
  data: {
    //轮播图数组
    swiperList: [],
    catesList: [],
    floorList:[]
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

    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },
  // 获取轮播图数据
  getSwiperList() {
    request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata"
    }).then(result => {
      // console.log(result);
      this.setData({
        swiperList: result.data.message
      })
    })
  },
  // 获取分类导航数据
  getCateList() {
    request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/home/catitems"
    }).then(result => {
      // console.log(result);
      this.setData({
        catesList: result.data.message
      })
    })
  },
  // 获取 楼层数据
  getFloorList() {
    request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/home/floordata"
    }).then(result => {
      // console.log(result);
      this.setData({
        floorList: result.data.message
      })
    })
  },
})