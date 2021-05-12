// pages/order/index.js
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
        value: "全部",
        isActive: true
      },
      {
        id: 1,
        value: "待付款",
        isActive: false
      }, {
        id: 2,
        value: "待发货",
        isActive: false
      },
      {
        id: 3,
        value: "退款/退货",
        isActive: false
      },
    ],
  },

  onShow(options) {
    const token = wx.getStorageSync('token');
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index',
      })
      return;
    }

    // console.log(options); //undefined
    let pages = getCurrentPages();
    // console.log(pages);
    let currentPage = pages[pages.length - 1];
    // console.log(currentPage.options);
    this.changeTitleByIndex(currentPage.options.type - 1);
    this.getOrders(currentPage.options.type)
  },

  //获取订单列表
  async getOrders(type) {
    const res = await request({
      url: "/my/orders/all",
      data: {
        type
      }
    })
    // console.log(res);
    this.setData({
      orders: res.data.message.orders.map(v => ({
        ...v,
        create_time_cn: (new Date(v.create_time * 1000).toLocaleString())
      }))
    })
  },

  changeTitleByIndex(index) {
    let {
      tabs
    } = this.data
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs
    })
  },

  // 标题点击事件 从子组件传递过来
  handleTabsItemChange(e) {
    // console.log(e);
    const {
      index
    } = e.detail;
    this.changeTitleByIndex(index);
    this.getOrders(index + 1);
  },
})