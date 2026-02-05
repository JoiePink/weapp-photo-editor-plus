//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    src: null,
    visible: false,
    size: {
      width: 600,
      height: 848
    },
    cropSizePercent: 0.9,
    borderColor: '#fff',
    result: '',

    list: [
      "/img/1.svg",
      "/img/2.svg",
      "/img/3.svg"
    ],

    currentIndex: 0,
    photoWidth: 600, // 逻辑显示宽度
    photoHeight: 848, // 逻辑显示高度
    canvasZoom: 40,

    tempImagePath: ''
  },
  initCanvas() {
    let that = this;
    wx.getSystemInfo({
      success: (res) => {
        const imageRatio = { width: 600, height: 848 };
        // 使用2倍canvas提升清晰度
        const canvasWidth = res.screenWidth * 2; // 2倍图宽度
        // 根据配置的图片比例计算高度
        const imageAreaHeight = canvasWidth * imageRatio.height / imageRatio.width;

        that.setData({
          screenHeight: res.screenHeight,
          photoWidth: canvasWidth, // canvas实际宽度（2倍图）
          photoHeight: imageAreaHeight, // canvas实际高度（2倍图）
        });
        // 初始化完成后绘制
        that.draw();
      }
    });
  },

  draw() {
    let that = this;

    let canvasWidth = this.data.photoWidth;
    let canvasHeight = this.data.photoHeight;

    let ctx = wx.createCanvasContext('canvasPoster', that);

    ctx.setFillStyle("red");
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.drawImage(this.data.result, 0, 0, canvasWidth, canvasHeight)
    ctx.drawImage(this.data.list[this.data.currentIndex], 0, 0, canvasWidth, canvasHeight)


    // 必须调用 draw() 才能将内容渲染到 Canvas 上
    ctx.draw(false, () => { // false表示不清空画布，回调确保绘制完成
      console.log('Canvas content drawn.');
      // 如果需要，可以在这里生成图片
      that.drawCanvas(ctx, canvasWidth, canvasHeight);
    });
  },

  drawCanvas(ctx, canvasWidth, canvasHeight) {
    let that = this;
    ctx.draw(true, () => {
      //然后生成一个保存用的临时地址, 因为安卓机兼容问题, 所以方法要延迟.
      setTimeout(() => {
        wx.canvasToTempFilePath({
          canvasId: 'canvasPoster',
          x: 0,
          y: 0,
          width: canvasWidth,
          height: canvasHeight,
          destWidth: canvasWidth,
          destHeight: canvasHeight,
          success: res => {
            let path = res.tempFilePath; //获取到了临时地址
            // 保存临时路径，供按钮点击时使用
            that.setData({
              tempImagePath: path
            });
            // 触发绘制完成事件
            that.triggerEvent('drawcomplete', { tempImagePath: path });
            console.log(this.data.tempImagePath)
          },
          fail: (err) => {
            console.error('生成临时图片失败:', err);
            that.triggerEvent('error', { err });
          }
        }, that);
      }, 200);
    });
  },

  onLoad: function (options) {
    if (options.file) {
      const file = options.file
      this.setData({
        visible: true,
        src: file,
      });
    }
  },

  onSelect(e) {
    this.setData({
      currentIndex: e.currentTarget.dataset.index
    })
    this.draw()
  },


  updateComponnet: function () {
    let src = this.data.src ? this.data.src : '';
    this.setData({
      visible: true,
      src: src,
      size: {
        width: 600,
        height: 848
      }
    })
  },

  uploadCallback: function (event) {
    console.log(event);
  },

  cropCallback: function (event) {
    console.log(event);
    this.setData({
      visible: false,
      result: event.detail.resultSrc,
    });
    this.initCanvas();
  },

  closeCallback: function () {
    console.log('closeCallback');
    this.goBack();
  },

  goToIndex: function () {
    const tempImagePath = this.data.tempImagePath;
    const src = this.data.src;
    wx.navigateTo({
      url: `/pages/index/index?tempImagePath=${encodeURIComponent(tempImagePath)}&src=${encodeURIComponent(src)}`
    });
  },

  goBack: function () {
    console.log('goBack');
    const pages = getCurrentPages();
    if (pages.length > 1) {
      wx.navigateBack({
        delta: 1
      });
    }
  }
})