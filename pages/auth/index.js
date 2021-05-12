// pages/auth/index.js
import {
  request
} from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
import {
  login
} from "../../utils/asyncWx.js";
Page({

  //获取用户信息
  async handleGetUserInfo(e) {
    // console.log(e);
    const {
      encryptedData,
      rawData,
      iv,
      signature
    } = e.detail;
    // wx.login({
    //   timeout: 10000,
    //   success: (result) => {
    //     // console.log(result);
    //     const {
    //       code
    //     } = result;
    //   }
    // })
    const {
      code
    } = await login();
    // console.log(code);
    const loginParams = {
      encryptedData,
      rawData,
      iv,
      signature,
      code
    }
    const res = await request({
      url: "/users/wxlogin",
      data: loginParams,
      method: "post"
    })
    // console.log(res); //需要企业账号，普通账号无效，，null，下为测试
    wx.setStorageSync('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo')
    wx.navigateBack({
      delta: 1,
    })
  }
})