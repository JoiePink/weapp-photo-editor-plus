// index.js

Page({
  data: {
    beautyAfterImg: '',
    beautyBeforeImg: '',
  },
  onLoad: function (options) {
    console.log(options)
    if (options.tempImagePath) {
      const tempImagePath = decodeURIComponent(options.tempImagePath)
      this.setData({
        beautyAfterImg: tempImagePath
      })
    }
    if (options.src) {
      const src = decodeURIComponent(options.src)
      this.setData({
        beautyBeforeImg: src
      })
    }
  },
  onChooseMedia() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success: (res) => {
        if (Array.isArray(res.tempFiles)) {
          res.tempFiles.forEach((file) => {
            if (file) {
              wx.navigateTo({
                url: `/pages/beauty/beauty?file=${file.tempFilePath}`
              })
              this.setData({
                beautyBeforeImg: file.tempFilePath
              })
              console.log(this.data.beautyBeforeImg)
            }
          })
        }
      }
    })
  },
})
