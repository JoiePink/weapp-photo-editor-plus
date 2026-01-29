// package-user/pages/post-check-in/post-check-in.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultData: {
      title: ''
    },
    inputValue: '', // 用于存储textarea的值
    tempImagePath: '', // 新增：用于存储从上一个页面传递过来的图片路径

    originFiles: [
      {
        url: 'https://tdesign.gtimg.com/mobile/demos/example4.png',
        name: 'uploaded1.png',
        type: 'image',
        removeBtn: true,
      },
      {
        url: 'https://tdesign.gtimg.com/mobile/demos/example6.png',
        name: 'uploaded2.png',
        type: 'image',
        removeBtn: true,
      },
      {
        url: 'https://tdesign.gtimg.com/mobile/demos/example5.png',
        name: 'uploaded3.png',
        type: 'image',
        removeBtn: true,
      },
    ],
    gridConfig: {
      column: 4,
      width: 160,
      height: 160,
    },
    config: {
      count: 1,
    },
  },

  onInput(e) {
    this.setData({
      inputValue: e.detail.value
    });
  },

   handleSuccess(e) {
     const { files } = e.detail;
     const lastFile = files[files.length - 1];
     wx.navigateTo({
       url: '/pages/test2/index?file=' + JSON.stringify(lastFile),
     })
     console.log('111')
   },
  handleRemove(e) {
    const { index } = e.detail;
    const { originFiles } = this.data;
    originFiles.splice(index, 1);
    this.setData({
      originFiles,
    });
  },
  handleClick(e) {
    console.log("43756348756");
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if (options.tempImagePath) {
      this.setData({
        tempImagePath: decodeURIComponent(options.tempImagePath)
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})