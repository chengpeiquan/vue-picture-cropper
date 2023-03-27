---
outline: deep
---

# API Reference

Because this plugin is a Vue component wrapper for Cropper.js, all APIs of Cropper.js are synchronized.

This document only records the properties and methods of component extensions. If you need more advanced functions, you can use the original Cropper.js API through the cropper instance. Click to read [Cropper.js API Documentation](https://github.com/fengyuanchen/cropperjs#cropperjs).

## Props

You can adjust it yourself by referring to the demo code of live demos.

| Props      | Type     | Description                                                                                            |
| :--------- | :------- | :----------------------------------------------------------------------------------------------------- |
| boxStyle   | object   | Define the style of the cropping area, that is, the style of the parent element that wraps the Cropper |
| img        | string   | Image address for cropping                                                                             |
| options    | object   | See [Options](#options)                                                                                |
| events     | function | See [Events](#events)                                                                                  |
| presetMode | object   | See [Preset Mode](./preset-mode.md)                                                                    |

:::tip
Remote images will involve [Cross-Origin problems](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) , and the server needs to be adjusted accordingly. Please try to use local images to avoid problems.
:::

- Example:

```vue
<template>
  <VuePictureCropper
    :boxStyle="{
      width: '100%',
      height: '100%',
      backgroundColor: '#f8f8f8',
      margin: 'auto',
    }"
    :img="pic"
    :options="{
      viewMode: 1,
      dragMode: 'crop',
      aspectRatio: 16 / 9,
    }"
    @ready="ready"
  />
</template>
```

## Options

Option parameters passed to Cropper.js, for a complete list of options, please refer to [Cropper.js Options Documentation](https://github.com/fengyuanchen/cropperjs#options) .

Common options are as follows:

| Property    | Type   | Description                                                                                                                                                                       |
| :---------- | :----- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| viewMode    | number | Determine the active range of the cropping frame, optional `0` / `1` / `2` / `3`, it is recommended to choose `1` (the cropping frame can only be active within the image area)   |
| aspectRatio | number | Specify the aspect ratio of the cropping frame, if not set, it will change freely (it is recommended to set the corresponding ratio according to the size of the cropping result) |

- Example:

```vue
<template>
  <VuePictureCropper
    :options="{
      viewMode: 1,
      dragMode: 'crop',
      aspectRatio: 16 / 9,
    }"
  />
</template>
```

## Events

Events passed to Cropper.js, each event is bound using `v-on:` or `@`, similar to the component Emits, for a complete list of events, please refer to [Cropper.js event documentation](https://github.com/fengyuanchen/cropperjs#events) 。

- Example:

```vue
<template>
  <VuePictureCropper @ready="ready" />
</template>
```

## Methods

The component extends several common methods on the basis of Cropper.js, and various APIs of the plugin can be called through the `cropper` instance.

### Type Declarations

```ts
export interface CropperInstance extends Cropper {
  /**
   * Get the cropped Base64 result
   * @description can be used for local preview display
   */
  getDataURL: (options?: Record<string, any>) => string

  /**
   * Get the cropped blob result
   * @description can be used to pass to the server
   */
  getBlob: (options?: Record<string, any>) => Promise<Blob | null>

  /**
   * Get the cropped file result
   * @description can be used to pass to the server
   * @since 0.2.0
   */
  getFile: (options?: Record<string, any>) => Promise<File | null>
}
```

Have to be aware of is:

1. `getDataURL` is a synchronous method, you can get the result directly
2. `getBlob` and `getFile` are asynchronous methods starting from `0.3.0`, and need to cooperate with `Promise` or `async / await` to get the result

All three methods belong to the built-in method of the plug-in. The generated file format is based on the format of the source image, and only supports processing local images, not remote images.

In addition, there are two common methods based on Cropper.js, which can be operated through examples:

1. Clear crop box `cropper.clear()`
2. Reset crop box `cropper.reset()`

### Parameters

The three methods of component extension can be passed in as parameters, which are used to control the changes of the obtained results.

| Property              | Type    | Description                                                                                                               | Default                                                   |
| :-------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------ | :-------------------------------------------------------- |
| width                 | number  | Set the width of the cropped result                                                                                       | The size of the cropping area of the original image       |
| height                | number  | Set the height of the cropped result                                                                                      | The size of the cropping area of the original image       |
| minWidth              | number  | Set the minimum width of the cropped result                                                                               | 0                                                         |
| minHeight             | number  | Set the minimum height of the clipping result                                                                             | 0                                                         |
| maxWidth              | number  | Set the maximum width of the cropped result                                                                               | Infinity                                                  |
| maxHeight             | number  | Set the maximum height of the cropped result                                                                              | Infinity                                                  |
| fillColor             | string  | Set the background color of the clipping result, for example, if you want to change the color of the png transparent area | transparent                                               |
| imageSmoothingEnabled | boolean | Whether to make the cropped image smooth                                                                                  | true                                                      |
| imageSmoothingQuality | string  | Image smoothing quality, optional `low` / `medium` / `high`                                                               | low                                                       |
| fileName              | string  | File name, currently only `getFile` will use this parameter, you can not pass it                                          | `cropped-${current timestamp}.${original file extension}` |

### Examples

Get the Base64 image using `getDataURL`, this is a synchronous method:

```js
// Set the specified size after cropping to `400 x 250`
const opt = {
  width: 400,
  height: 250,
}

// After cropping, the result will be generated according to this size
const dataURL = cropper.getDataURL(opt)
```

If you want to get Blob and File formats, please remember to use asynchronous methods:

```js
cropper.getBlob().then((blob) => {
  console.log('Blob', blob)
})
// Or use `await cropper.getBlob()`

cropper.getFile().then((file) => {
  console.log('File', file)
})
// Or use `await cropper.getFile()`
```

If you need to convert formats or process remote images, please use the [getCroppedCanvas](https://github.com/fengyuanchen/cropperjs#getcroppedcanvasoptions) API, it provided by Cropper.js. This method has some asynchronous operations, please pay attention to the usage instructions.
