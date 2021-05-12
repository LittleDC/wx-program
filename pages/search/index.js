// pages/search/index.js
import {
  request
} from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    isFocus: false,
    inputValue: [],
  },

  TimeId: -1,

  //输入框事件
  handleInput(e) {
    // console.log(e);
    const {
      value
    } = e.detail;
    if (!value.trim()) {
      clearTimeout(this.TimeId);
      this.setData({
        goods: [],
        isFocus: false,
      })
      return;
    }
    this.setData({
      isFocus: true,
    })
    // this.qsearch(value);
    //防抖
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(() => {
      this.qsearch(value);
    }, 1000);
  },

  //发送请求 获取搜索建议数据
  async qsearch(query) {
    const res = await request({
      url: "/goods/qsearch",
      data: {
        query
      }
    });
    // console.log(res);
    this.setData({
      goods: res.data.message
    })
  },

  //取消按钮事件
  handleCancel() {
    this.setData({
      inputValue: [],
      isFocus: false,
      goods: [],
    })
  }

})