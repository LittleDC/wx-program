import {
  request
} from "../../request/index.js"
Page({
  data: {
    //左侧菜单数据
    leftMenuList: [],
    //右侧商品数据
    rightContent: [],
    //被点击的左侧菜单
    currentIndex: 0
  },

  //接口的返回数据
  Cates: [],

  onLoad: function (options) {
    this.getCates();
  },

  //获取分类数据
  getCates() {
    request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/categories"
    }).then(res => {
      // console.log(res);
      this.Cates = res.data.message
      let leftMenuList = this.Cates.map(v => v.cat_name)
      let rightContent = this.Cates[0].children
      this.setData({
        // leftMenuList:leftMenuList
        leftMenuList,
        rightContent
      })
    })
  }
})