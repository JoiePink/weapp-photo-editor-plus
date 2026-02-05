## 微信小程序裁剪 + 加边框方案使用说明

本项目是一个微信小程序示例，提供**上传照片 → 裁剪照片 → 套用边框模板 → 生成成品图**的一整套简单流程。下面分两部分说明：


---
- **1. 页面结构**
  - `pages/index/index`：**首页**
    - 展示“上传图片”按钮。
    - 展示“原图”和“美化后”的对比图。
    - 调用 `wx.chooseMedia` 选择图片后，`navigateTo` 到 `pages/beauty/beauty`，并把文件路径通过参数传过去。
  - `pages/beauty/beauty`：**裁剪 + 加边框页面**
    - 使用自定义组件 `simple-crop` 做裁剪。
    - 下方用横向 `scroll-view` 列出多个 SVG 边框模板。
    - 顶部有关闭和确认两个操作按钮。
  - `pages/simple-crop/index`：**裁剪组件**
    - 负责图片的：缩放、拖动、旋转、自动适配裁剪框、输出裁剪结果等。

- **2. 裁剪组件的使用方式（在页面里）**
  - 在页面的 `json` 中声明组件：
    - `usingComponents` 中配置：`"simple-crop": "../simple-crop/index"`。
  - 在 `wxml` 中使用组件：
    - 传入属性：
      - `src`：要裁剪的图片路径。
      - `size`：裁剪后目标尺寸（例如 `{ width: 600, height: 848 }`）。
      - `cropSizePercent`：裁剪框在显示区域中的占比。
      - `borderColor`：裁剪框边框颜色。
    - 监听事件：
      - `bindcropUpload`：开始加载图片时的回调（可选）。
      - `bindcropClose`：关闭裁剪弹层的回调。
      - `bindcropCrop`：裁剪完成后的回调，通过 `event.detail.resultSrc` 拿到裁剪结果地址。

- **3. 加边框与导出成品的方式**
  - `beauty` 页面中维护一个 `list` 数组（在 `beauty.js` 中）：
    - 里面是若干个 SVG 模板的路径，例如：`/img/1.svg`、`/img/2.svg` 等。
  - 裁剪完成后，页面会：
    - 在 `canvas` 上先绘制裁剪后的图片。
    - 再绘制当前选中的边框 SVG。
    - 最后通过 `wx.canvasToTempFilePath` 生成一张**最终成品图**，并把地址保存下来。
  - 点击“√”后，会用 `navigateTo` 把这个成品图地址传回首页。

- **4. 简单的二次开发建议**
  - **新增 / 替换边框模板**：
    - 在 `img` 目录中新增 SVG 图片。
    - 把新图片路径加入到 `beauty` 页的数据 `list` 中。
  - **修改成品图尺寸**：
    - 同时调整：
      - 裁剪组件传入的 `size`（裁剪输出尺寸）。
      - `beauty` 页中用于绘制 `canvas` 的宽高（保持等比例）。

---

