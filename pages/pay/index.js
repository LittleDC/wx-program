// pages/cart/index.js
import regeneratorRuntime from '../../lib/runtime/runtime';
import {
  request
} from "../../request/index.js";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0,
  },

  onShow() {
    let address = wx.getStorageSync('address');
    let cart = wx.getStorageSync('cart') || [];

    cart = cart.filter(v => v.checked);
    this.setData({
      address
    });
    // this.setCart(checkedCart);
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      totalPrice += v.num * v.goods_price;
      totalNum += v.num;
    })
    this.setData({
      cart,
      totalPrice,
      totalNum,
      address,
    });
  },

  //获取地址
  async handleChooseAddress() {
    // console.log("chat");
    wx.chooseAddress({
      success: (result) => {
        // console.log(result);
        result.all = result.provinceName + result.cityName + result.countyName + result.detailInfo;
        wx.setStorageSync('address', result)
      },
    });

    // wx.getSetting({
    //   success: (result1) => {
    //     console.log(result1)
    //   }
    // })
  },

  //点击 支付
  async handleOrderPay() {
    const token = wx.getStorageSync('token');
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index',
      })
      return;
    }
    // console.log("token existed");
    // const header = {
    //   Authorization: token
    // };
    const order_price = this.data.totalPrice;
    const consignee_addr = this.data.address.all;
    const cart = this.data.cart;
    let goods = [];
    cart.forEach(v => {
      goods.push({
        goods_id: v.goods_id,
        goods_number: v.num,
        goods_price: v.goods_price,
      })
    });
    const orderParams = {
      order_price,
      consignee_addr,
      goods
    };
    const res = await request({
      url: "/my/orders/create",
      method: "POST",
      data: orderParams,
    });
    console.log(res); //无效鸭，token

    //////////////////////////华丽分割线///////////////////////
    //支付成功后，，，
    //删除缓存
    let newCart = wx.getStorageSync('cart');
    newCart = newCart.filter(v => !v.checked)
    wx.setStorageSync('cart', newCart);

    wx.navigateTo({
      url: '/pages/order/index',
    })
  }

})