import {
  text as text_cfg
} from "../../../config";

const share_text = text_cfg.app_name + ' - ' + text_cfg.info.share_tip;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    text_cfg: text_cfg,
    github_link: "https://github.com/sysucats/zhongdamaopu",
    update_log: [ {
      version: "v2.1.1",
      content: [
        "点赞榜单修复"
      ],
      time: "2023/7/25"
    }, {
      version: "v2.1.0",
      content: [
        "徽章系统上线啦~",
        "增加徽章兑换码系统&徽章赠送记录",
        "精选Tab重置为榜单",
        "留言板升级为便利贴墙",
        "修复科普页图片等问题",
        "修复关于页数字不显示的问题",
        "修复首页空白问题",
      ],
      time: "2023/7/24"
    }, {
      version: "v2.0.2",
      content: [
        "首页添加Tips"
      ],
      time: "2023/7/20"
    }, {
      version: "v2.0.1",
      content: [
        "主题色调改为绿色",
      ],
      time: "2023/7/14"
    }, {
      version: "v2.0.0",
      content: [
        "小程序重新部署上线啦"
      ],
      time: "2023/7/13"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: share_text
    }
  },

  copyWechat: function () {
    wx.setClipboardData({
      data: "Pao_Leo",
    });
  },

  copyOpenSourceLink: function () {
    wx.setClipboardData({
      data: this.data.github_link,
    });
  }
})