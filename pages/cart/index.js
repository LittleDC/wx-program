// pages/cart/index.js
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
  },

  onShow() {
    let address = wx.getStorageSync('address');
    address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
    this.setData({
      address
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  async handleChooseAddress() {
    // console.log("chat");
    wx.chooseAddress({
      success: (result) => {
        // console.log(result);
        wx.setStorageSync('address', result)
      },
    });
    // wx.getSetting({
    //   success: (result1) => {
    //     console.log(result1)
    //   }
    // })
  }
})