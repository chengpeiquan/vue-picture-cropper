---
outline: deep
---

# Cropper.js API {#cropper-js-api}

This is taken from the [Cropper.js 1.x](https://github.com/fengyuanchen/cropperjs/tree/v1.6.2) documentation. Due to changes in the main branch of Cropper.js, an API description is archived in this document.

## Options {#options}

The options below correspond to the [VuePictureCropper](./component-api.md) and [useCropper](./hook-api.md) `options` prop. Pass them via `props.options` on the component to take effect.

### viewMode {#view-mode}

- Type: `Number`
- Default: `0`
- Options:
  - `0`: no restrictions
  - `1`: restrict the crop box not to exceed the size of the canvas.
  - `2`: restrict the minimum canvas size to fit within the container. If the proportions of the canvas and the container differ, the minimum canvas will be surrounded by extra space in one of the dimensions.
  - `3`: restrict the minimum canvas size to fill fit the container. If the proportions of the canvas and the container are different, the container will not be able to fit the whole canvas in one of the dimensions.

Define the view mode of the cropper. If you set `viewMode` to `0`, the crop box can extend outside the canvas, while a value of `1`, `2`, or `3` will restrict the crop box to the size of the canvas. `viewMode` of `2` or `3` will additionally restrict the canvas to the container. There is no difference between `2` and `3` when the proportions of the canvas and the container are the same.

### dragMode {#drag-mode}

- Type: `String`
- Default: `'crop'`
- Options:
  - `'crop'`: create a new crop box
  - `'move'`: move the canvas
  - `'none'`: do nothing

Define the dragging mode of the cropper.

### initialAspectRatio {#initial-aspect-ratio}

- Type: `Number`
- Default: `NaN`

Define the initial aspect ratio of the crop box. By default, it is the same as the aspect ratio of the canvas (image wrapper).

> Only available when the `aspectRatio` option is set to `NaN`.

### aspectRatio {#aspect-ratio}

- Type: `Number`
- Default: `NaN`

Define the fixed aspect ratio of the crop box. By default, the crop box has a free ratio.

### data {#data}

- Type: `Object`
- Default: `null`

The previous cropped data you stored will be passed to the `setData` method automatically when initialized.

> Only available when the `autoCrop` option had set to the `true`.

### preview {#preview}

- Type: `Element`, `Array` (elements), `NodeList` or `String` (selector)
- Default: `''`
- An element or an array of elements or a node list object or a valid selector for [Document.querySelectorAll](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll)

Add extra elements (containers) for preview.

**Notes:**

- The maximum width is the initial width of the preview container.
- The maximum height is the initial height of the preview container.
- If you set an `aspectRatio` option, be sure to set the same aspect ratio to the preview container.
- If the preview does not display correctly, set the `overflow: hidden` style to the preview container.

### responsive {#responsive}

- Type: `Boolean`
- Default: `true`

Re-render the cropper when resizing the window.

### restore {#restore}

- Type: `Boolean`
- Default: `true`

Restore the cropped area after resizing the window.

### checkCrossOrigin {#check-cross-origin}

- Type: `Boolean`
- Default: `true`

Check if the current image is a cross-origin image.

If so, a `crossOrigin` attribute will be added to the cloned image element, and a timestamp parameter will be added to the `src` attribute to reload the source image to avoid browser cache error.

Adding a `crossOrigin` attribute to the image element will stop adding a timestamp to the image URL and stop reloading the image. But the request (XMLHttpRequest) to read the image data for orientation checking will require a timestamp to bust the cache to avoid browser cache error. You can set the `checkOrientation` option to `false` to cancel this request.

If the value of the image's `crossOrigin` attribute is `"use-credentials"`, then the `withCredentials` attribute will set to `true` when read the image data by XMLHttpRequest.

### checkOrientation {#check-orientation}

- Type: `Boolean`
- Default: `true`

Check the current image's Exif Orientation information. Note that only a JPEG image may contain Exif Orientation information.

Exactly, read the Orientation value for rotating or flipping the image, and then override the Orientation value with `1` (the default value) to avoid some issues ([1](https://github.com/fengyuanchen/cropper/issues/120), [2](https://github.com/fengyuanchen/cropper/issues/509)) on iOS devices.

Requires to set both the `rotatable` and `scalable` options to `true` at the same time.

**Note:** Do not trust this all the time as some JPG images may have incorrect (non-standard) Orientation values

> Requires [Typed Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) support ([IE 10+](https://caniuse.com/typedarrays)).

### modal {#modal}

- Type: `Boolean`
- Default: `true`

Show the black modal above the image and under the crop box.

### guides {#guides}

- Type: `Boolean`
- Default: `true`

Show the dashed lines above the crop box.

### center {#center}

- Type: `Boolean`
- Default: `true`

Show the center indicator above the crop box.

### highlight {#highlight}

- Type: `Boolean`
- Default: `true`

Show the white modal above the crop box (highlight the crop box).

### background {#background}

- Type: `Boolean`
- Default: `true`

Show the grid background of the container.

### autoCrop {#auto-crop}

- Type: `Boolean`
- Default: `true`

Enable to crop the image automatically when initialized.

### autoCropArea {#auto-crop-area}

- Type: `Number`
- Default: `0.8` (80% of the image)

It should be a number between 0 and 1. Define the automatic cropping area size (percentage).

### movable {#movable}

- Type: `Boolean`
- Default: `true`

Enable to move the image.

### rotatable {#rotatable}

- Type: `Boolean`
- Default: `true`

Enable to rotate the image.

### scalable {#scalable}

- Type: `Boolean`
- Default: `true`

Enable to scale the image.

### zoomable {#zoomable}

- Type: `Boolean`
- Default: `true`

Enable to zoom the image.

### zoomOnTouch {#zoom-on-touch}

- Type: `Boolean`
- Default: `true`

Enable to zoom the image by dragging touch.

### zoomOnWheel {#zoom-on-wheel}

- Type: `Boolean`
- Default: `true`

Enable to zoom the image by mouse wheeling.

### wheelZoomRatio {#wheel-zoom-ratio}

- Type: `Number`
- Default: `0.1`

Define zoom ratio when zooming the image by mouse wheeling.

### cropBoxMovable {#crop-box-movable}

- Type: `Boolean`
- Default: `true`

Enable to move the crop box by dragging.

### cropBoxResizable {#crop-box-resizable}

- Type: `Boolean`
- Default: `true`

Enable to resize the crop box by dragging.

### toggleDragModeOnDblclick {#toggle-drag-mode-on-dblclick}

- Type: `Boolean`
- Default: `true`

Enable to toggle drag mode between `"crop"` and `"move"` when clicking twice on the cropper.

> Requires [`dblclick`](https://developer.mozilla.org/en-US/docs/Web/Events/dblclick) event support.

### minContainerWidth {#min-container-width}

- Type: `Number`
- Default: `200`

The minimum width of the container.

### minContainerHeight {#min-container-height}

- Type: `Number`
- Default: `100`

The minimum height of the container.

### minCanvasWidth {#min-canvas-width}

- Type: `Number`
- Default: `0`

The minimum width of the canvas (image wrapper).

### minCanvasHeight {#min-canvas-height}

- Type: `Number`
- Default: `0`

The minimum height of the canvas (image wrapper).

### minCropBoxWidth {#min-crop-box-width}

- Type: `Number`
- Default: `0`

The minimum width of the crop box.

**Note:** This size is relative to the page, not the image.

### minCropBoxHeight {#min-crop-box-height}

- Type: `Number`
- Default: `0`

The minimum height of the crop box.

**Note:** This size is relative to the page, not the image.

### ready {#option-ready}

- Type: `Function`
- Default: `null`

A shortcut to the `ready` event.

### cropstart {#option-crop-start}

- Type: `Function`
- Default: `null`

A shortcut to the `cropstart` event.

### cropmove {#option-crop-move}

- Type: `Function`
- Default: `null`

A shortcut to the `cropmove` event.

### cropend {#option-crop-end}

- Type: `Function`
- Default: `null`

A shortcut to the `cropend` event.

### crop {#option-crop}

- Type: `Function`
- Default: `null`

A shortcut to the `crop` event.

### zoom {#option-zoom}

- Type: `Function`
- Default: `null`

A shortcut to the `zoom` event.

## Methods {#methods}

As there is an **asynchronous** process when loading the image, you **should call most of the methods after ready**, except `setAspectRatio`, `replace` and `destroy`.

> If a method doesn't need to return any value, it will return the cropper instance (`this`) for chain composition.

```js
new Cropper(image, {
  ready() {
    // this.cropper[method](argument1, , argument2, ..., argumentN);
    this.cropper.move(1, -1)

    // Allows chain composition
    this.cropper.move(1, -1).rotate(45).scale(1, -1)
  },
})
```

### crop() {#crop}

Show the crop box manually.

```js
new Cropper(image, {
  autoCrop: false,
  ready() {
    // Do something here
    // ...

    // And then
    this.cropper.crop()
  },
})
```

### reset() {#reset}

Reset the image and crop box to its initial states.

### clear() {#clear}

Clear the crop box.

### replace(url[, hasSameSize]) {#replace}

- **url**:
  - Type: `String`
  - A new image url.

- **hasSameSize** (optional):
  - Type: `Boolean`
  - Default: `false`
  - If the new image has the same size as the old one, then it will not rebuild the cropper and only update the URLs of all related images. This can be used for applying filters.

Replace the image's src and rebuild the cropper.

### enable() {#enable}

Enable (unfreeze) the cropper.

### disable() {#disable}

Disable (freeze) the cropper.

### destroy() {#destroy}

Destroy the cropper and remove the instance from the image.

### move(offsetX[, offsetY]) {#move}

- **offsetX**:
  - Type: `Number`
  - Moving size (px) in the horizontal direction.

- **offsetY** (optional):
  - Type: `Number`
  - Moving size (px) in the vertical direction.
  - If not present, its default value is `offsetX`.

Move the canvas (image wrapper) with relative offsets.

```js
cropper.move(1)
cropper.move(1, 0)
cropper.move(0, -1)
```

### moveTo(x[, y]) {#move-to}

- **x**:
  - Type: `Number`
  - The `left` value of the canvas

- **y** (optional):
  - Type: `Number`
  - The `top` value of the canvas
  - If not present, its default value is `x`.

Move the canvas (image wrapper) to an absolute point.

### zoom(ratio) {#zoom}

- **ratio**:
  - Type: `Number`
  - Zoom in: requires a positive number (ratio > 0)
  - Zoom out: requires a negative number (ratio < 0)

Zoom the canvas (image wrapper) with a relative ratio.

```js
cropper.zoom(0.1)
cropper.zoom(-0.1)
```

### zoomTo(ratio[, pivot]) {#zoom-to}

- **ratio**:
  - Type: `Number`
  - Requires a positive number (ratio > 0)

- **pivot** (optional):
  - Type: `Object`
  - Schema: `{ x: Number, y: Number }`
  - The coordinate of the center point for zooming, base on the top left corner of the cropper container.

Zoom the canvas (image wrapper) to an absolute ratio.

```js
cropper.zoomTo(1) // 1:1 (canvasData.width === canvasData.naturalWidth)

const containerData = cropper.getContainerData()

// Zoom to 50% from the center of the container.
cropper.zoomTo(0.5, {
  x: containerData.width / 2,
  y: containerData.height / 2,
})
```

### rotate(degree) {#rotate}

- **degree**:
  - Type: `Number`
  - Rotate right: requires a positive number (degree > 0)
  - Rotate left: requires a negative number (degree < 0)

Rotate the image to a relative degree.

> Requires [CSS3 2D Transforms](https://developer.mozilla.org/en-US/docs/Web/CSS/transform) support ([IE 9+](https://caniuse.com/transforms2d)).

```js
cropper.rotate(90)
cropper.rotate(-90)
```

### rotateTo(degree) {#rotate-to}

- **degree**:
  - Type: `Number`

Rotate the image to an absolute degree.

### scale(scaleX[, scaleY]) {#scale}

- **scaleX**:
  - Type: `Number`
  - Default: `1`
  - The scaling factor applies to the abscissa of the image.
  - When equal to `1` it does nothing.

- **scaleY** (optional):
  - Type: `Number`
  - The scaling factor to apply on the ordinate of the image.
  - If not present, its default value is `scaleX`.

Scale the image.

> Requires [CSS3 2D Transforms](https://developer.mozilla.org/en-US/docs/Web/CSS/transform) support ([IE 9+](https://caniuse.com/transforms2d)).

```js
cropper.scale(-1) // Flip both horizontal and vertical
cropper.scale(-1, 1) // Flip horizontal
cropper.scale(1, -1) // Flip vertical
```

### scaleX(scaleX) {#scale-x}

- **scaleX**:
  - Type: `Number`
  - Default: `1`
  - The scaling factor applies to the abscissa of the image.
  - When equal to `1` it does nothing.

Scale the abscissa of the image.

### scaleY(scaleY) {#scale-y}

- **scaleY**:
  - Type: `Number`
  - Default: `1`
  - The scaling factor to apply on the ordinate of the image.
  - When equal to `1` it does nothing.

Scale the ordinate of the image.

### getData([rounded]) {#get-data}

- **rounded** (optional):
  - Type: `Boolean`
  - Default: `false`
  - Set `true` to get rounded values.

- (return value):
  - Type: `Object`
  - Properties:
    - `x`: the offset left of the cropped area
    - `y`: the offset top of the cropped area
    - `width`: the width of the cropped area
    - `height`: the height of the cropped area
    - `rotate`: the rotated degrees of the image
    - `scaleX`: the scaling factor to apply on the abscissa of the image
    - `scaleY`: the scaling factor to apply on the ordinate of the image

Output the final cropped area position and size data (based on the natural size of the original image).

> You can send the data to the server-side to crop the image directly:
>
> 1. Rotate the image with the `rotate` property.
> 2. Scale the image with the `scaleX` and `scaleY` properties.
> 3. Crop the image with the `x`, `y`, `width`, and `height` properties.

![A schematic diagram for data's properties](/cropperjs-docs/data.jpg)

### setData(data) {#set-data}

- **data**:
  - Type: `Object`
  - Properties: See the [`getData`](#get-data) method.
  - You may need to round the data properties before passing them in.

Change the cropped area position and size with new data (based on the original image).

> **Note:** This method only available when the value of the `viewMode` option is greater than or equal to `1`.

### getContainerData() {#get-container-data}

- (return value):
  - Type: `Object`
  - Properties:
    - `width`: the current width of the container
    - `height`: the current height of the container

Output the container size data.

![A schematic diagram for cropper's layers](/cropperjs-docs/layers.jpg)

### getImageData() {#get-image-data}

- (return value):
  - Type: `Object`
  - Properties:
    - `left`: the offset left of the image
    - `top`: the offset top of the image
    - `width`: the width of the image
    - `height`: the height of the image
    - `naturalWidth`: the natural width of the image
    - `naturalHeight`: the natural height of the image
    - `aspectRatio`: the aspect ratio of the image
    - `rotate`: the rotated degrees of the image if it is rotated
    - `scaleX`: the scaling factor to apply on the abscissa of the image if scaled
    - `scaleY`: the scaling factor to apply on the ordinate of the image if scaled

Output the image position, size, and other related data.

### getCanvasData() {#get-canvas-data}

- (return value):
  - Type: `Object`
  - Properties:
    - `left`: the offset left of the canvas
    - `top`: the offset top of the canvas
    - `width`: the width of the canvas
    - `height`: the height of the canvas
    - `naturalWidth`: the natural width of the canvas (read only)
    - `naturalHeight`: the natural height of the canvas (read only)

Output the canvas (image wrapper) position and size data.

```js
const imageData = cropper.getImageData()
const canvasData = cropper.getCanvasData()

if (imageData.rotate % 180 === 0) {
  console.log(canvasData.naturalWidth === imageData.naturalWidth)
  // > true
}
```

### setCanvasData(data) {#set-canvas-data}

- **data**:
  - Type: `Object`
  - Properties:
    - `left`: the new offset left of the canvas
    - `top`: the new offset top of the canvas
    - `width`: the new width of the canvas
    - `height`: the new height of the canvas

Change the canvas (image wrapper) position and size with new data.

### getCropBoxData() {#get-crop-box-data}

- (return value):
  - Type: `Object`
  - Properties:
    - `left`: the offset left of the crop box
    - `top`: the offset top of the crop box
    - `width`: the width of the crop box
    - `height`: the height of the crop box

Output the crop box position and size data.

### setCropBoxData(data) {#set-crop-box-data}

- **data**:
  - Type: `Object`
  - Properties:
    - `left`: the new offset left of the crop box
    - `top`: the new offset top of the crop box
    - `width`: the new width of the crop box
    - `height`: the new height of the crop box

Change the crop box position and size with new data.

### getCroppedCanvas([options]) {#get-cropped-canvas}

- **options** (optional):
  - Type: `Object`
  - Properties:
    - `width`: the destination width of the output canvas.
    - `height`: the destination height of the output canvas.
    - `minWidth`: the minimum destination width of the output canvas, the default value is `0`.
    - `minHeight`: the minimum destination height of the output canvas, the default value is `0`.
    - `maxWidth`: the maximum destination width of the output canvas, the default value is `Infinity`.
    - `maxHeight`: the maximum destination height of the output canvas, the default value is `Infinity`.
    - `fillColor`: a color to fill any alpha values in the output canvas, the default value is the `transparent`.
    - [`imageSmoothingEnabled`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/imageSmoothingEnabled): set to change if images are smoothed (`true`, default) or not (`false`).
    - [`imageSmoothingQuality`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/imageSmoothingQuality): set the quality of image smoothing, one of "low" (default), "medium", or "high".
    - `rounded`: set `true` to use rounded values (the cropped area position and size data), the default value is `false`.

- (return value):
  - Type: `HTMLCanvasElement`
  - A canvas drawn the cropped image.

- Notes:
  - The aspect ratio of the output canvas will be fitted to the aspect ratio of the crop box automatically.
  - If you intend to get a JPEG image from the output canvas, you should set the `fillColor` option first, if not, the transparent part in the JPEG image will become black by default.
  - Uses the Browser's native [canvas.toBlob](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob) API to do the compression work, which means it is **lossy compression**. For better image quality, you can upload the original image and the cropped data to a server and do the crop work on the server.

- Browser support:
  - Basic image: requires [Canvas](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement) support ([IE 9+](https://caniuse.com/canvas)).
  - Rotated image: requires [CSS3 2D Transforms](https://developer.mozilla.org/en-US/docs/Web/CSS/transform) support ([IE 9+](https://caniuse.com/transforms2d)).
  - Cross-origin image: requires HTML5 [CORS settings attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) support ([IE 11+](https://caniuse.com/cors)).

Get a canvas drawn from the cropped image (lossy compression). If it is not cropped, then returns a canvas drawn the whole image.

> After then, you can display the canvas as an image directly, or use [HTMLCanvasElement.toDataURL](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL) to get a Data URL, or use [HTMLCanvasElement.toBlob](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob) to get a blob and upload it to server with [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) if the browser supports these APIs.

Avoid getting a blank (or black) output image, you might need to set the `maxWidth` and `maxHeight` properties to limited numbers, because of [the size limits of a canvas element](https://stackoverflow.com/questions/6081483/maximum-size-of-a-canvas-element). Also, you should limit the maximum zoom ratio (in the `zoom` event) for the same reason.

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

// Upload cropped image to server if the browser supports `HTMLCanvasElement.toBlob`.
// The default value for the second parameter of `toBlob` is 'image/png', change it if necessary.
cropper.getCroppedCanvas().toBlob(
  (blob) => {
    const formData = new FormData()

    // Pass the image file name as the third parameter if necessary.
    formData.append('croppedImage', blob /*, 'example.png' */)

    // Use `jQuery.ajax` method for example
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

- **aspectRatio**:
  - Type: `Number`
  - Requires a positive number.

Change the aspect ratio of the crop box.

### setDragMode([mode]) {#set-drag-mode}

- **mode** (optional):
  - Type: `String`
  - Default: `'none'`
  - Options: `'none'`, `'crop'`, `'move'`

Change the drag mode.

**Tips:** You can toggle the "crop" and "move" mode by double clicking on the cropper.

## Events {#events}

Events passed through to Cropper.js.

- For [VuePictureCropper](./component-api.md), bind each event on the component with [v-on or @](https://vuejs.org/api/built-in-directives.html#v-on).
- For [useCropper](./hook-api.md), inside [onInstanceEffect](./hook-api.md#instance-effect):
  - use `addEventListener` to attach listeners
  - use `removeEventListener` in the cleanup to remove them

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

This event fires when the target image has been loaded and the cropper instance is ready for operating.

### cropstart {#event-crop-start}

- **event.detail.originalEvent**:
  - Type: `Event`
  - Options: `pointerdown`, `touchstart`, and `mousedown`

- **event.detail.action**:
  - Type: `String`
  - Options:
    - `'crop'`: create a new crop box
    - `'move'`: move the canvas (image wrapper)
    - `'zoom'`: zoom in / out the canvas (image wrapper) by touch.
    - `'e'`: resize the east side of the crop box
    - `'w'`: resize the west side of the crop box
    - `'s'`: resize the south side of the crop box
    - `'n'`: resize the north side of the crop box
    - `'se'`: resize the southeast side of the crop box
    - `'sw'`: resize the southwest side of the crop box
    - `'ne'`: resize the northeast side of the crop box
    - `'nw'`: resize the northwest side of the crop box
    - `'all'`: move the crop box (all directions)

This event fires when the canvas (image wrapper) or the crop box starts to change.

```js
image.addEventListener('cropstart', (event) => {
  console.log(event.detail.originalEvent)
  console.log(event.detail.action)
})
```

### cropmove {#event-crop-move}

- **event.detail.originalEvent**:
  - Type: `Event`
  - Options: `pointermove`, `touchmove`, and `mousemove`.

- **event.detail.action**: the same as "cropstart".

This event fires when the canvas (image wrapper) or the crop box is changing.

### cropend {#event-crop-end}

- **event.detail.originalEvent**:
  - Type: `Event`
  - Options: `pointerup`, `pointercancel`, `touchend`, `touchcancel`, and `mouseup`.

- **event.detail.action**: the same as "cropstart".

This event fires when the canvas (image wrapper) or the crop box stops changing.

### crop {#event-crop}

- **event.detail.x**
- **event.detail.y**
- **event.detail.width**
- **event.detail.height**
- **event.detail.rotate**
- **event.detail.scaleX**
- **event.detail.scaleY**

> About these properties, see the [`getData`](#get-data) method.

This event fires when the canvas (image wrapper) or the crop box changes.

**Notes:**

- When the `autoCrop` option is set to the `true`, a `crop` event will be triggered before the `ready` event.
- When the `data` option is set, another `crop` event will be triggered before the `ready` event.

### zoom {#event-zoom}

- **event.detail.originalEvent**:
  - Type: `Event`
  - Options: `wheel`, `pointermove`, `touchmove`, and `mousemove`.

- **event.detail.oldRatio**:
  - Type: `Number`
  - The old (current) ratio of the canvas

- **event.detail.ratio**:
  - Type: `Number`
  - The new (next) ratio of the canvas (`canvasData.width / canvasData.naturalWidth`)

This event fires when a cropper instance starts to zoom in or zoom out its canvas (image wrapper).

```js
image.addEventListener('zoom', (event) => {
  // Zoom in
  if (event.detail.ratio > event.detail.oldRatio) {
    event.preventDefault() // Prevent zoom in
  }

  // Zoom out
  // ...
})
```
