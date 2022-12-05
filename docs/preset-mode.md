---
outline: deep
---

# Preset Mode

This plugin provides some commonly used preset modes for quick use in daily business scenarios.

## Type Declarations

```ts
/**
 * Preset options for component props
 * @since 0.4.0
 */
export interface PresetModeOptions {
  mode?: SupportedPresetMode
  width?: number
  height?: number
}

/**
 * Preset Modes Supported by Components
 */
export type SupportedPresetMode =
  // Specifies the size of the cropped result
  | 'fixedSize'
  // Generate a round cropping result
  | 'round'
```

## Notices

1. The preset mode only provides some simplified configurations. For example, obtaining the round cropping result originally requires cumbersome operations. Using the preset mode is out of the box, but some options that should be passed in still need to be passed in `options` , you can refer to the source code of live demos.
2. When using the preset mode, the "cropping area" and "cropping result" will keep the same size, that is, `presetMode.width` and `presetMode.height` specified in the preset mode will override The `width` and `height` passed in by `getDataURL` and other get result APIs.
3. When specifying `presetMode.width` and `presetMode.height`, please pay attention to whether the aspect ratio is consistent with `options.aspectRatio`, if not, you may not get the desired result
4. `presetMode.mode` only accepts the values mentioned in the `SupportedPresetMode` type, passing in other values will not work

## Fixed Size Mode

The size of the cropping area can be fixed, and the cropping result is as large as the cropping area (in this case, the user can be prohibited from modifying the size of the cropping area).

Click to view: [Live Demo](./preset-mode-fixed-size.md)

- Instructions:

1. Specify `mode` of `presetMode` as `fixedSize`
2. Specify `width` and `height` of `presetMode` to be the desired size
3. Set `dragMode` of `options` to `move` to prevent the crop box from being canceled
4. Set `cropBoxResizable` of `options` to `false` to turn off crop box resizing
5. Specify the aspectRatio ratio of `options` as a ratio of `width / height`

- Example:

```html
<template>
  <vue-picture-cropper
    :boxStyle="{
      width: '100%',
      height: '100%',
      backgroundColor: '#f8f8f8',
      margin: 'auto',
    }"
    :img="pic"
    :options="{
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      cropBoxResizable: false,
    }"
    :presetMode="{
      mode: 'fixedSize',
      width: 100,
      height: 100,
    }"
  />
</template>
```

## Round Mode

If business scenarios such as user uploading avatars need to be cropped into a circular image, you can use this mode to obtain a circular PNG image (in this mode, the cropping result is always a `.png` image).

This mode also fixes the size of the cropping area, and the cropping result is as large as the cropping area (in this case, the user can be prohibited from modifying the size of the cropping area).

Click to view: [Live Demo](./preset-mode-round.md)

- Instructions:

1. Specify the `mode` of `presetMode` as `round`
2. Specify the `width` and `height` of `presetMode` as the desired size, the two values need to be the same
3. Set `dragMode` of `options` to `move` to prevent the crop box from being canceled
4. Set `cropBoxResizable` of `options` to `false` to turn off crop box resizing
5. Specify aspectRatio ratio of `options` to `1`

- Example:

```html
<template>
  <vue-picture-cropper
    :boxStyle="{
      width: '100%',
      height: '100%',
      backgroundColor: '#f8f8f8',
      margin: 'auto',
    }"
    :img="pic"
    :options="{
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      cropBoxResizable: false,
    }"
    :presetMode="{
      mode: 'round',
      width: 100,
      height: 100,
    }"
  />
</template>
```
