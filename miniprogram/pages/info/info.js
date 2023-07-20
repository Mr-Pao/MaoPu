// miniprogram/pages/info/info.js
import { isManagerAsync } from "../../user";
import { text as text_cfg, mpcode_img,feedback_wj_img } from "../../config";
import { showTab } from "../../page";
import { cloud } from "../../cloudAccess";

const share_text = text_cfg.app_name + ' - ' + text_cfg.info.share_tip;

const logo_img = "/pages/public/images/app_logo.png";

Page({
  data: {
    logo_img,
    friendApps: [],
    showManager: false,
    numChkPhotos: 0,
    numFeedbacks: 0,
    numImProcess: 0,
    friendLinkImgLoaded:false,
    text_cfg: text_cfg,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // 开发模式
    const sysInfo = wx.getSystemInfoSync();
    this.setData({
      devMode: sysInfo.platform === "devtools"
    });

    const db = await cloud.databaseAsync();
    var friendLinkRes = await db.collection('setting').doc('friendLink').get();
    this.setData({
      friendApps: friendLinkRes.data.apps,
    });

    // 设置为特邀用户
    const {query} = wx.getLaunchOptionsSync();
    console.log("query", query);
    if (query.inviteRole) {
      this.doInviteRole(options);
    }
  },

  // 用 onShow 不用 onLoad，为了在返回这个页面时也能重新加载
  onShow: async function () {
    // 切换自定义tab
    showTab(this);

    // 获取version
    this.setData({
      version: getApp().globalData.version
    });

    if (!await isManagerAsync()) {
      return;
    }
    const db = await cloud.databaseAsync();
    const _ = db.command;

    // 待处理照片
    const imProcessQf = { photo_compressed: _.in([undefined, '']), verified: true, photo_id: /^((?!\.heic$).)*$/i };
    // 所有猫猫数量
    const allCatQf = {};
    // 所有照片数量
    const allPhotoQf = { verified: true, photo_id: /^((?!\.heic$).)*$/i };
    // 所有留言数量
    const allCommentQf = { deleted: _.not(_.eq(true)) };
    var [numChkPhotos, numFeedbacks, numImProcess, numAllCats, numAllPhotos, numAllComments] = await Promise.all([
      db.collection('photo').where({ verified: false}).count(),
      db.collection('feedback').where({ dealed: false}).count(),
      db.collection('photo').where(imProcessQf).count(),
      db.collection('cat').where(allCatQf).count(),
      db.collection('photo').where(allPhotoQf).count(),
      db.collection('comment').where(allCommentQf).count(),
    ]);
    this.setData({
      numChkPhotos: numChkPhotos.total,
      numFeedbacks: numFeedbacks.total,
      numImProcess: numImProcess.total,
      showManager: true,
      numAllCats: numAllCats.total,
      numAllPhotos: numAllPhotos.total,
      numAllComments: numAllComments.total,
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: share_text
    }
  },

  onShareTimeline:function () {
    return {
      title: share_text,
    }
  },

  clickbtn(e) {
    const to = e.currentTarget.dataset.to;
    if (!to) {
      return false;
    }
    wx.navigateTo({
      url: to,
    });
  },

  clickFriendLink(e) {
    const appid = e.currentTarget.dataset.appid;
    wx.navigateToMiniProgram({
      appId: appid
    })
  },

  async showMpCode(e) {
    wx.previewImage({
      urls: [await cloud.signCosUrl(mpcode_img)],
      fail: function(e) {
        console.error(e)
      }
    })
  },

  showLogo(e) {
    wx.previewImage({
      urls: [logo_img],
      fail: function(e) {
        console.error(e)
      }
    })
  },

  clearCache() {
    wx.clearStorageSync();
    wx.showToast({
      title: '清理完成',
    })
  },

  async toNewCat() {
    const src = await cloud.signCosUrl(feedback_wj_img);
    wx.previewImage({
      urls: [src],
      success: (res) => {
        console.log(res);
      },
      fail: (res) => {
        console.log(res);
      },
      complete: (res) => {
        console.log(res);
      },
    });
  },
})

