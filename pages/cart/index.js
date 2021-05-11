// pages/cart/index.js
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0,
  },

  onShow() {
    let address = wx.getStorageSync('address');
    const cart = wx.getStorageSync('cart') || [];

    this.setData({
      address
    });
    this.setCart(cart);
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

  //商品的选中
  handeItemChange(e) {
    const goods_id = e.currentTarget.dataset.id;
    // console.log(goods_id);
    let {
      cart
    } = this.data;
    let index = cart.findIndex(v => v.goods_id === goods_id);
    cart[index].checked = !cart[index].checked;

    this.setCart(cart);
  },

  //设置购物车状态 重新计算
  setCart(cart) {
    //计算全选
    // const allChecked = cart.length ? cart.every(v => v.checked) : false;
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      } else {
        allChecked = false;
      }
    })
    allChecked = cart.length != 0 ? allChecked : false;
    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked
    });
    wx.setStorageSync('cart', cart);
  },

  //商品全选功能
  handleItemAllChecked() {
    console.log(1);
    let {
      cart,
      allChecked
    } = this.data;
    allChecked = !allChecked;
    // console.log(allChecked);
    cart.forEach(v => v.checked = allChecked)
    this.setCart(cart);
  },

  //商品数量编辑
  handleItemNumEdit(e) {
    const {
      operation,
      id
    } = e.currentTarget.dataset;
    // console.log(operation, id);
    let {
      cart
    } = this.data;
    const index = cart.findIndex(v => v.goods_id === id);
    if (cart[index].num === 1 && operation === -1) {
      wx.showModal({
        title: '提示',
        content: '您是否要删除?',
        success: (res) => {
          if (res.confirm) {
            cart.splice(index, 1);
            this.setCart(cart);
          } else if (res.cancel) {
            console.log('cancle');
          }
        },
      })
    } else {
      cart[index].num += operation;
      this.setCart(cart);
    }
  },

  //结算
  handlePay() {
    const {
      address,
      totalNum
    } = this.data;
    if (!address.userName) {
      wx.showToast({
        title: '您还没有选择收货地址',
        icon: 'none',
        duration: 500,
        mask: true,
      })
      return;
    }
    if (totalNum === 0) {
      wx.showToast({
        title: '您还没有选购商品',
        icon: 'none',
        duration: 500,
        mask: true,
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/index',
    })
  }
})