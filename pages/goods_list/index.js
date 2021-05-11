// pages/goods_list/index.js
import {
  request
} from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      }, {
        id: 2,
        value: "价格",
        isActive: false
      },
    ],
    goodsList: []
  },

  // 接口要的参数
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10,
  },

  totalPages: 1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    this.QueryParams.cid = options.cid;
    this.getGoodsList();

  },

  //获取商品列表数据
  async getGoodsList() {
    const res = await request({
      url: "/goods/search",
      data: this.QueryParams
    })
    // console.log(res.data.message);
    const total = res.data.message.total;
    this.totalPages = Math.ceil(total / this.QueryParams.pagesize);
    // console.log(this.totalPages);
    this.setData({
      // goodsList: res.data.message.goods
      goodsList: [...this.data.goodsList, ...res.data.message.goods]
    });
    //关闭下拉刷新窗口
    wx.stopPullDownRefresh()
  },

  // 标题点击事件 从子组件传递过来
  handleTabsItemChange(e) {
    // console.log(e);
    const {
      index
    } = e.detail;
    let {
      tabs
    } = this.data
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs
    })
  },

  //页面上滑 滚动条触底事件
  onReachBottom() {
    // console.log('bottom');
    if (this.QueryParams.pagenum >= this.totalPages) {
      console.log('%c' + "没有下一页数据", "color:red;font-size:100px;background-image:linear-gradient(to right,#0094ff,pink)");
      wx - wx.showToast({
        title: '没有啦',
      })
    } else {
      // console.log('%c' + "有下一页数据", "color:red;font-size:100px;background-image:linear-gradient(to right,#0094ff,pink)");
      this.QueryParams.pagenum++;
      this.getGoodsList()
    }
  },

  //下拉刷新事件
  onPullDownRefresh() {
    //重置数组
    this.setData({
      goodsList: []
    });
    //重置页码
    this.QueryParams.pagenum = 1;
    //发送请求
    this.getGoodsList()

  }
})