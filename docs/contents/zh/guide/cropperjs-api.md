---
outline: deep
---

# Cropper.js API {#cropper-js-api}

本文档摘取自 [Cropper.js 1.x](https://github.com/fengyuanchen/cropperjs/tree/v1.6.2) 文档。因 Cropper.js 主分支有变更，故将 API 说明归档于此。

## 配置项 {#options}

以下选项对应 [VuePictureCropper](./component-api.md) 和 [useCropper](./hook-api.md) 的 `options` 属性，通过组件的 `props.options` 传入即可生效。

### viewMode {#view-mode}

- 类型：`Number`
- 默认：`0`
- 可选值：
  - `0`：无限制
  - `1`：限制裁剪框不超过画布尺寸
  - `2`：限制画布最小尺寸以适应容器；若画布与容器比例不同，最小画布会在某一维度上留有空白
  - `3`：限制画布最小尺寸以填满容器；若画布与容器比例不同，容器将无法在某一维度上完整容纳画布

定义裁剪器的视图模式。设为 `0` 时裁剪框可超出画布；设为 `1`、`2` 或 `3` 时会将裁剪框限制在画布内。`2` 或 `3` 还会将画布限制在容器内。当画布与容器比例相同时，`2` 与 `3` 无区别。

### dragMode {#drag-mode}

- 类型：`String`
- 默认：`'crop'`
- 可选值：
  - `'crop'`：新建裁剪框
  - `'move'`：移动画布
  - `'none'`：不响应拖拽

定义裁剪器的拖拽模式。

### initialAspectRatio {#initial-aspect-ratio}

- 类型：`Number`
- 默认：`NaN`

定义裁剪框的初始宽高比，默认与画布（图片容器）宽高比一致。

> 仅在 `aspectRatio` 为 `NaN` 时生效。

### aspectRatio {#aspect-ratio}

- 类型：`Number`
- 默认：`NaN`

定义裁剪框的固定宽高比，默认下裁剪框为自由比例。

### data {#data}

- 类型：`Object`
- 默认：`null`

初始化时会自动将此前保存的裁剪数据传给 `setData` 方法。

> 仅在 `autoCrop` 为 `true` 时可用。

### preview {#preview}

- 类型：`Element`、`Array`（元素数组）、`NodeList` 或 `String`（选择器）
- 默认：`''`
- 可为单个元素、元素数组、NodeList，或 [Document.querySelectorAll](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) 支持的选择器字符串

用于预览的额外元素（容器）。

**注意：**

- 预览区域最大宽度为容器的初始宽度
- 预览区域最大高度为容器的初始高度
- 若设置了 `aspectRatio`，请为预览容器设置相同宽高比
- 若预览显示异常，可为预览容器设置 `overflow: hidden`

### responsive {#responsive}

- 类型：`Boolean`
- 默认：`true`

窗口尺寸变化时重新渲染裁剪器。

### restore {#restore}

- 类型：`Boolean`
- 默认：`true`

窗口尺寸变化后恢复之前的裁剪区域。

### checkCrossOrigin {#check-cross-origin}

- 类型：`Boolean`
- 默认：`true`

是否检测当前图片为跨域图片。

若为跨域，会为克隆的图片元素添加 `crossOrigin` 属性，并在 `src` 上追加时间戳参数以重新加载图片，避免浏览器缓存问题。

在图片元素上已有 `crossOrigin` 时，将不再给图片 URL 加时间戳、也不再重新加载图片。但用于方向检测而读取图片数据的 XMLHttpRequest 仍会加时间戳以绕过缓存，可将 `checkOrientation` 设为 `false` 取消该请求。

若图片的 `crossOrigin` 为 `"use-credentials"`，则通过 XMLHttpRequest 读取图片数据时会将 `withCredentials` 设为 `true`。

### checkOrientation {#check-orientation}

- 类型：`Boolean`
- 默认：`true`

是否读取当前图片的 Exif 方向信息（仅 JPEG 可能包含）。

会读取 Orientation 并用于旋转/翻转图片，然后将 Orientation 覆写为 `1`（默认值），以避免在 iOS 上的已知问题（[1](https://github.com/fengyuanchen/cropper/issues/120)、[2](https://github.com/fengyuanchen/cropper/issues/509)）。

需同时将 `rotatable` 和 `scalable` 设为 `true`。

**注意：** 部分 JPG 的 Orientation 可能不标准，不可完全依赖此选项。

> 依赖 [Typed Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) 支持（[IE 10+](https://caniuse.com/typedarrays)）。

### modal {#modal}

- 类型：`Boolean`
- 默认：`true`

在图片上方、裁剪框下方显示黑色遮罩。

### guides {#guides}

- 类型：`Boolean`
- 默认：`true`

在裁剪框上显示虚线辅助线。

### center {#center}

- 类型：`Boolean`
- 默认：`true`

在裁剪框上显示中心指示。

### highlight {#highlight}

- 类型：`Boolean`
- 默认：`true`

在裁剪框上显示白色遮罩（高亮裁剪区域）。

### background {#background}

- 类型：`Boolean`
- 默认：`true`

显示容器的网格背景。

### autoCrop {#auto-crop}

- 类型：`Boolean`
- 默认：`true`

初始化时是否自动显示裁剪区域。

### autoCropArea {#auto-crop-area}

- 类型：`Number`
- 默认：`0.8`（占图片 80%）

取 0～1 之间的数，表示自动裁剪区域占图片的比例。

### movable {#movable}

- 类型：`Boolean`
- 默认：`true`

是否允许移动图片。

### rotatable {#rotatable}

- 类型：`Boolean`
- 默认：`true`

是否允许旋转图片。

### scalable {#scalable}

- 类型：`Boolean`
- 默认：`true`

是否允许缩放图片。

### zoomable {#zoomable}

- 类型：`Boolean`
- 默认：`true`

是否允许缩放（放大/缩小）图片。

### zoomOnTouch {#zoom-on-touch}

- 类型：`Boolean`
- 默认：`true`

是否允许通过触摸拖拽缩放图片。

### zoomOnWheel {#zoom-on-wheel}

- 类型：`Boolean`
- 默认：`true`

是否允许通过鼠标滚轮缩放图片。

### wheelZoomRatio {#wheel-zoom-ratio}

- 类型：`Number`
- 默认：`0.1`

使用鼠标滚轮缩放时的缩放比例。

### cropBoxMovable {#crop-box-movable}

- 类型：`Boolean`
- 默认：`true`

是否允许通过拖拽移动裁剪框。

### cropBoxResizable {#crop-box-resizable}

- 类型：`Boolean`
- 默认：`true`

是否允许通过拖拽调整裁剪框大小。

### toggleDragModeOnDblclick {#toggle-drag-mode-on-dblclick}

- 类型：`Boolean`
- 默认：`true`

是否在裁剪器上双击时在 `"crop"` 与 `"move"` 模式间切换。

> 依赖 [`dblclick`](https://developer.mozilla.org/en-US/docs/Web/Events/dblclick) 事件支持。

### minContainerWidth {#min-container-width}

- 类型：`Number`
- 默认：`200`

容器最小宽度。

### minContainerHeight {#min-container-height}

- 类型：`Number`
- 默认：`100`

容器最小高度。

### minCanvasWidth {#min-canvas-width}

- 类型：`Number`
- 默认：`0`

画布（图片容器）最小宽度。

### minCanvasHeight {#min-canvas-height}

- 类型：`Number`
- 默认：`0`

画布（图片容器）最小高度。

### minCropBoxWidth {#min-crop-box-width}

- 类型：`Number`
- 默认：`0`

裁剪框最小宽度。

**注意：** 该尺寸相对于页面，而非图片。

### minCropBoxHeight {#min-crop-box-height}

- 类型：`Number`
- 默认：`0`

裁剪框最小高度。

**注意：** 该尺寸相对于页面，而非图片。

### ready {#option-ready}

- 类型：`Function`
- 默认：`null`

`ready` 事件的快捷配置。

### cropstart {#option-crop-start}

- 类型：`Function`
- 默认：`null`

`cropstart` 事件的快捷配置。

### cropmove {#option-crop-move}

- 类型：`Function`
- 默认：`null`

`cropmove` 事件的快捷配置。

### cropend {#option-crop-end}

- 类型：`Function`
- 默认：`null`

`cropend` 事件的快捷配置。

### crop {#option-crop}

- 类型：`Function`
- 默认：`null`

`crop` 事件的快捷配置。

### zoom {#option-zoom}

- 类型：`Function`
- 默认：`null`

`zoom` 事件的快捷配置。

## 方法 {#methods}

图片加载存在**异步**过程，**多数方法应在 ready 之后调用**，仅 `setAspectRatio`、`replace`、`destroy` 可在 ready 前使用。

> 无返回值的方法会返回裁剪器实例（`this`），以支持链式调用。

```js
new Cropper(image, {
  ready() {
    // this.cropper[method](argument1, , argument2, ..., argumentN);
    this.cropper.move(1, -1)

    // 支持链式调用
    this.cropper.move(1, -1).rotate(45).scale(1, -1)
  },
})
```

### crop() {#crop}

手动显示裁剪框。

```js
new Cropper(image, {
  autoCrop: false,
  ready() {
    // 在此处理
    // ...

    // 然后
    this.cropper.crop()
  },
})
```

### reset() {#reset}

将图片与裁剪框恢复为初始状态。

### clear() {#clear}

清除裁剪框。

### replace(url[, hasSameSize]) {#replace}

- **url**：
  - 类型：`String`
  - 新图片地址

- **hasSameSize**（可选）：
  - 类型：`Boolean`
  - 默认：`false`
  - 若新图与旧图尺寸相同，则不重建裁剪器，仅更新所有相关图片的 URL，可用于应用滤镜等场景

替换图片 `src` 并重建裁剪器。

### enable() {#enable}

启用（解冻）裁剪器。

### disable() {#disable}

禁用（冻结）裁剪器。

### destroy() {#destroy}

销毁裁剪器并从图片上移除实例。

### move(offsetX[, offsetY]) {#move}

- **offsetX**：
  - 类型：`Number`
  - 水平方向移动量（px）

- **offsetY**（可选）：
  - 类型：`Number`
  - 垂直方向移动量（px）
  - 不传时默认与 `offsetX` 相同

按相对偏移移动画布（图片容器）。

```js
cropper.move(1)
cropper.move(1, 0)
cropper.move(0, -1)
```

### moveTo(x[, y]) {#move-to}

- **x**：
  - 类型：`Number`
  - 画布的 `left` 值

- **y**（可选）：
  - 类型：`Number`
  - 画布的 `top` 值
  - 不传时默认与 `x` 相同

将画布（图片容器）移动到绝对位置。

### zoom(ratio) {#zoom}

- **ratio**：
  - 类型：`Number`
  - 放大：正数（ratio > 0）
  - 缩小：负数（ratio < 0）

按相对比例缩放画布（图片容器）。

```js
cropper.zoom(0.1)
cropper.zoom(-0.1)
```

### zoomTo(ratio[, pivot]) {#zoom-to}

- **ratio**：
  - 类型：`Number`
  - 须为正数（ratio > 0）

- **pivot**（可选）：
  - 类型：`Object`
  - 结构：`{ x: Number, y: Number }`
  - 缩放中心点坐标，相对于裁剪器容器左上角

将画布（图片容器）缩放到指定比例。

```js
cropper.zoomTo(1) // 1:1 (canvasData.width === canvasData.naturalWidth)

const containerData = cropper.getContainerData()

// 以容器中心为基准缩放到 50%
cropper.zoomTo(0.5, {
  x: containerData.width / 2,
  y: containerData.height / 2,
})
```

### rotate(degree) {#rotate}

- **degree**：
  - 类型：`Number`
  - 顺时针：正数（degree > 0）
  - 逆时针：负数（degree < 0）

按相对角度旋转图片。

> 依赖 [CSS3 2D Transforms](https://developer.mozilla.org/en-US/docs/Web/CSS/transform) 支持（[IE 9+](https://caniuse.com/transforms2d)）。

```js
cropper.rotate(90)
cropper.rotate(-90)
```

### rotateTo(degree) {#rotate-to}

- **degree**：
  - 类型：`Number`

将图片旋转到指定角度。

### scale(scaleX[, scaleY]) {#scale}

- **scaleX**：
  - 类型：`Number`
  - 默认：`1`
  - 图片横轴缩放系数，为 `1` 时不缩放

- **scaleY**（可选）：
  - 类型：`Number`
  - 图片纵轴缩放系数
  - 不传时默认与 `scaleX` 相同

缩放图片。

> 依赖 [CSS3 2D Transforms](https://developer.mozilla.org/en-US/docs/Web/CSS/transform) 支持（[IE 9+](https://caniuse.com/transforms2d)）。

```js
cropper.scale(-1) // 水平、垂直都翻转
cropper.scale(-1, 1) // 水平翻转
cropper.scale(1, -1) // 垂直翻转
```

### scaleX(scaleX) {#scale-x}

- **scaleX**：
  - 类型：`Number`
  - 默认：`1`
  - 图片横轴缩放系数，为 `1` 时不缩放

缩放图片横轴。

### scaleY(scaleY) {#scale-y}

- **scaleY**：
  - 类型：`Number`
  - 默认：`1`
  - 图片纵轴缩放系数，为 `1` 时不缩放

缩放图片纵轴。

### getData([rounded]) {#get-data}

- **rounded**（可选）：
  - 类型：`Boolean`
  - 默认：`false`
  - 设为 `true` 可得到四舍五入后的数值

- 返回值：
  - 类型：`Object`
  - 属性：
    - `x`：裁剪区域左边偏移
    - `y`：裁剪区域上边偏移
    - `width`：裁剪区域宽度
    - `height`：裁剪区域高度
    - `rotate`：图片旋转角度
    - `scaleX`：图片横轴缩放系数
    - `scaleY`：图片纵轴缩放系数

输出最终裁剪区域的位置与尺寸（基于原图自然尺寸）。

> 可将该数据发往服务端直接裁剪图片：
>
> 1. 用 `rotate` 旋转图片
> 2. 用 `scaleX`、`scaleY` 缩放图片
> 3. 用 `x`、`y`、`width`、`height` 裁剪图片

![裁剪数据属性示意](/cropperjs-docs/data.jpg)

### setData(data) {#set-data}

- **data**：
  - 类型：`Object`
  - 属性说明见 [`getData`](#get-data) 方法
  - 传入前可能需要对属性做四舍五入

用新数据（基于原图）更新裁剪区域位置与尺寸。

> **注意：** 仅当 `viewMode` 大于等于 `1` 时可用。

### getContainerData() {#get-container-data}

- 返回值：
  - 类型：`Object`
  - 属性：
    - `width`：容器当前宽度
    - `height`：容器当前高度

输出容器尺寸数据。

![裁剪器层级示意](/cropperjs-docs/layers.jpg)

### getImageData() {#get-image-data}

- 返回值：
  - 类型：`Object`
  - 属性：
    - `left`：图片左边偏移
    - `top`：图片上边偏移
    - `width`：图片宽度
    - `height`：图片高度
    - `naturalWidth`：图片自然宽度
    - `naturalHeight`：图片自然高度
    - `aspectRatio`：图片宽高比
    - `rotate`：若已旋转，为旋转角度
    - `scaleX`：若已缩放，为横轴缩放系数
    - `scaleY`：若已缩放，为纵轴缩放系数

输出图片位置、尺寸及其他相关数据。

### getCanvasData() {#get-canvas-data}

- 返回值：
  - 类型：`Object`
  - 属性：
    - `left`：画布左边偏移
    - `top`：画布上边偏移
    - `width`：画布宽度
    - `height`：画布高度
    - `naturalWidth`：画布自然宽度（只读）
    - `naturalHeight`：画布自然高度（只读）

输出画布（图片容器）位置与尺寸数据。

```js
const imageData = cropper.getImageData()
const canvasData = cropper.getCanvasData()

if (imageData.rotate % 180 === 0) {
  console.log(canvasData.naturalWidth === imageData.naturalWidth)
  // > true
}
```

### setCanvasData(data) {#set-canvas-data}

- **data**：
  - 类型：`Object`
  - 属性：
    - `left`：画布新左边偏移
    - `top`：画布新上边偏移
    - `width`：画布新宽度
    - `height`：画布新高度

用新数据更新画布（图片容器）位置与尺寸。

### getCropBoxData() {#get-crop-box-data}

- 返回值：
  - 类型：`Object`
  - 属性：
    - `left`：裁剪框左边偏移
    - `top`：裁剪框上边偏移
    - `width`：裁剪框宽度
    - `height`：裁剪框高度

输出裁剪框位置与尺寸数据。

### setCropBoxData(data) {#set-crop-box-data}

- **data**：
  - 类型：`Object`
  - 属性：
    - `left`：裁剪框新左边偏移
    - `top`：裁剪框新上边偏移
    - `width`：裁剪框新宽度
    - `height`：裁剪框新高度

用新数据更新裁剪框位置与尺寸。

### getCroppedCanvas([options]) {#get-cropped-canvas}

- **options**（可选）：
  - 类型：`Object`
  - 属性：
    - `width`：输出画布目标宽度
    - `height`：输出画布目标高度
    - `minWidth`：输出画布最小宽度，默认 `0`
    - `minHeight`：输出画布最小高度，默认 `0`
    - `maxWidth`：输出画布最大宽度，默认 `Infinity`
    - `maxHeight`：输出画布最大高度，默认 `Infinity`
    - `fillColor`：填充输出画布透明区域的颜色，默认 `transparent`
    - [`imageSmoothingEnabled`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/imageSmoothingEnabled)：是否启用图片平滑（`true` 为默认，`false` 为不启用）
    - [`imageSmoothingQuality`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/imageSmoothingQuality)：平滑质量，可选 "low"（默认）、"medium"、"high"
    - `rounded`：是否对裁剪区域位置与尺寸做四舍五入，默认 `false`

- 返回值：
  - 类型：`HTMLCanvasElement`
  - 绘制了裁剪结果的画布

- 说明：
  - 输出画布宽高比会自动匹配裁剪框
  - 若需得到 JPEG，建议先设置 `fillColor`，否则透明区域在 JPEG 中会变为黑色
  - 使用浏览器原生 [canvas.toBlob](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob) 做压缩，为**有损压缩**。追求画质时可上传原图与裁剪数据到服务端裁剪

- 浏览器支持：
  - 基础图片：需 [Canvas](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement) 支持（[IE 9+](https://caniuse.com/canvas)）
  - 旋转图片：需 [CSS3 2D Transforms](https://developer.mozilla.org/en-US/docs/Web/CSS/transform) 支持（[IE 9+](https://caniuse.com/transforms2d)）
  - 跨域图片：需 HTML5 [CORS 属性](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) 支持（[IE 11+](https://caniuse.com/cors)）

获取绘制了裁剪结果的画布（有损压缩）。若未裁剪则返回绘制整张图片的画布。

> 之后可直接展示该画布，或通过 [HTMLCanvasElement.toDataURL](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL) 得到 Data URL，或通过 [HTMLCanvasElement.toBlob](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob) 得到 Blob 并用 [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) 上传（需浏览器支持）。

为避免得到空白或全黑图片，可能需将 `maxWidth`、`maxHeight` 设为有限值（受 [canvas 尺寸限制](https://stackoverflow.com/questions/6081483/maximum-size-of-a-canvas-element) 影响）。同理，建议在 `zoom` 事件中限制最大缩放比。

```js
cropper.getCroppedCanvas()

cropper.getCroppedCanvas({
  width: 160,
  height: 90,
})

cropper.getCroppedCanvas({
  minWidth: 256,
  minHeight: 256,
  maxWidth: 4096,
  maxHeight: 4096,
})

cropper.getCroppedCanvas({
  fillColor: '#fff',
  imageSmoothingEnabled: false,
  imageSmoothingQuality: 'high',
})

// 若浏览器支持 `HTMLCanvasElement.toBlob`，可将裁剪结果上传
// `toBlob` 的第二个参数默认为 'image/png'，可按需修改
cropper.getCroppedCanvas().toBlob(
  (blob) => {
    const formData = new FormData()

    // 如需指定文件名，可传入 toBlob 的第三个参数
    formData.append('croppedImage', blob /*, 'example.png' */)

    // 以 jQuery.ajax 为例
    $.ajax('/path/to/upload', {
      method: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success() {
        console.log('Upload success')
      },
      error() {
        console.log('Upload error')
      },
    })
  } /*, 'image/png' */,
)
```

### setAspectRatio(aspectRatio) {#set-aspect-ratio}

- **aspectRatio**：
  - 类型：`Number`
  - 须为正数

修改裁剪框宽高比。

### setDragMode([mode]) {#set-drag-mode}

- **mode**（可选）：
  - 类型：`String`
  - 默认：`'none'`
  - 可选：`'none'`、`'crop'`、`'move'`

修改拖拽模式。

**提示：** 可双击裁剪器在 "crop" 与 "move" 模式间切换。

## 事件 {#events}

传递给 Cropper.js 的事件。

- 对于 [VuePictureCropper](./component-api.md) ，每个事件都使用 [v-on: 或 @](https://cn.vuejs.org/api/built-in-directives.html#v-on) 在组件上绑定。
- 对于 [useCropper](./hook-api.md) ，请在 [onInstanceEffect](./hook-api.md#instance-effect) 内：
  - 使用 `addEventListener` 启用监听
  - 使用 `removeEventListener` 卸载监听

::: code-group

```vue [VuePictureCropper]
<template>
  <VuePictureCropper @ready="onReady" @crop="onCrop" />
</template>
```

```vue [useCropper]
<script setup lang="ts">
cropper.onInstanceEffect((instance) => {
  if (!instance) return

  const el = instance.element
  el.addEventListener('ready', onReady)
  el.addEventListener('crop', onCrop)

  return () => {
    el.removeEventListener('ready', onReady)
    el.removeEventListener('crop', onCrop)
  }
})
</script>
```

:::

### ready {#event-ready}

当目标图片加载完成且裁剪器实例可操作时触发。

### cropstart {#event-crop-start}

- **event.detail.originalEvent**：
  - 类型：`Event`
  - 可能为：`pointerdown`、`touchstart`、`mousedown`

- **event.detail.action**：
  - 类型：`String`
  - 可选值：
    - `'crop'`：新建裁剪框
    - `'move'`：移动画布（图片容器）
    - `'zoom'`：通过触摸缩放画布（图片容器）
    - `'e'`：调整裁剪框东侧
    - `'w'`：调整裁剪框西侧
    - `'s'`：调整裁剪框南侧
    - `'n'`：调整裁剪框北侧
    - `'se'`：调整裁剪框东南角
    - `'sw'`：调整裁剪框西南角
    - `'ne'`：调整裁剪框东北角
    - `'nw'`：调整裁剪框西北角
    - `'all'`：移动裁剪框（任意方向）

当画布（图片容器）或裁剪框开始变化时触发。

```js
image.addEventListener('cropstart', (event) => {
  console.log(event.detail.originalEvent)
  console.log(event.detail.action)
})
```

### cropmove {#event-crop-move}

- **event.detail.originalEvent**：
  - 类型：`Event`
  - 可能为：`pointermove`、`touchmove`、`mousemove`

- **event.detail.action**：同 "cropstart"

当画布（图片容器）或裁剪框正在变化时触发。

### cropend {#event-crop-end}

- **event.detail.originalEvent**：
  - 类型：`Event`
  - 可能为：`pointerup`、`pointercancel`、`touchend`、`touchcancel`、`mouseup`

- **event.detail.action**：同 "cropstart"

当画布（图片容器）或裁剪框结束变化时触发。

### crop {#event-crop}

- **event.detail.x**
- **event.detail.y**
- **event.detail.width**
- **event.detail.height**
- **event.detail.rotate**
- **event.detail.scaleX**
- **event.detail.scaleY**

> 以上属性含义见 [`getData`](#get-data) 方法。

当画布（图片容器）或裁剪框发生变化时触发。

**说明：**

- 当 `autoCrop` 为 `true` 时，会在 `ready` 之前触发一次 `crop`
- 当设置了 `data` 时，会在 `ready` 之前再触发一次 `crop`

### zoom {#event-zoom}

- **event.detail.originalEvent**：
  - 类型：`Event`
  - 可能为：`wheel`、`pointermove`、`touchmove`、`mousemove`

- **event.detail.oldRatio**：
  - 类型：`Number`
  - 画布当前（旧）缩放比

- **event.detail.ratio**：
  - 类型：`Number`
  - 画布新的缩放比（`canvasData.width / canvasData.naturalWidth`）

当裁剪器实例开始放大或缩小画布（图片容器）时触发。

```js
image.addEventListener('zoom', (event) => {
  // 放大
  if (event.detail.ratio > event.detail.oldRatio) {
    event.preventDefault() // 阻止放大
  }

  // 缩小
  // ...
})
```
