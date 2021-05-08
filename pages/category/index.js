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
    currentIndex: 0,
    //右侧内容滚动条距离顶部距离
    scollTop: 0,
  },

  //接口的返回数据
  Cates: [],

  onLoad: function (options) {
    // this.getCates(0);
    const Cates = wx.getStorageSync('cates')
    // console.log(Cates);
    if (!Cates) {
      this.getCates(0)
    } else {
      // console.log(Date.now()-Cates.time);
      if ((Date.now() - Cates.time) > 1000 * 10) {
        this.getCates(0)
      } else {
        console.log('can use cookie');
        this.Cates = Cates.data
        let leftMenuList = this.Cates.map(v => v.cat_name)
        let rightContent = this.Cates[0].children
        this.setData({
          // leftMenuList:leftMenuList
          leftMenuList,
          rightContent
        })
      }
    }
  },

  //获取分类数据
  getCates(index) {
    request({
      url: "/categories"
    }).then(res => {
      // console.log(res);
      this.Cates = res.data.message
      wx.setStorageSync('cates', {
        time: Date.now(),
        data: this.Cates
      })
      let leftMenuList = this.Cates.map(v => v.cat_name)
      let rightContent = this.Cates[index].children
      this.setData({
        // leftMenuList:leftMenuList
        leftMenuList,
        rightContent
      })
    })
  },

  //左侧菜单的点击事件
  handleItemTap(e) {
    // console.log(e);
    const {
      index
    } = e.currentTarget.dataset
    let rightContent = this.Cates[index].children
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0
    })
    // this.getCates(index)
  }
})