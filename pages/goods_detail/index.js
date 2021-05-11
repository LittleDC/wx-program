// pages/goods_detail/index.js
import {
  request
} from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {}
  },
  GoodsInfo: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      goods_id
    } = options;
    // console.log(goods_id);
    this.getGoodsDetails(goods_id);
  },

  //获取商品的详情数据
  async getGoodsDetails(goods_id) {
    const res = await request({
      url: "/goods/detail",
      data: {
        goods_id
      }
    });
    this.GoodsInfo = res.data.message;
    // console.log(res.data.message);
    this.setData({
      goodsObj: {
        goods_name: res.data.message.goods_name,
        goods_price: res.data.message.goods_price,
        goods_introduce: res.data.message.goods_introduce,
        pics: res.data.message.pics,
      }
    })
  },

  //点击轮播图 放大预览
  handlePreviewImage(e) {
    // console.log("preview");
    const urls = this.GoodsInfo.pics.map(v => v.pics_mid);
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      urls: urls,
      current: current,
    })
  },

  //点击 加入购物车
  handleCartAdd() {
    // console.log("cart");
    let cart = wx.getStorageSync("cart") || [];
    console.log(cart);
    let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);
    if (index === -1) {
      //不存在，第一次添加
      // console.log("first");
      this.GoodsInfo.num = 1;
      cart.push(this.GoodsInfo);
    } else {
      cart[index].num++;
    }
    //重新添加购物车到缓存
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: 'true',
    })
  }
})