---
outline: deep
---

# VuePictureCropper API

VuePictureCropper is a thin Vue wrapper around Cropper.js and supports the full Cropper.js API.

This document only covers the component’s extended props and methods. For more advanced behavior, use the `cropper` instance with the [Cropper.js API](./cropperjs-api.md).

## Usage examples {#examples}

The component is simple but its options are numerous; it’s best to check the [Examples](../examples/basic-component.md) and their source comments for usage.

## Props {#props}

The component’s prop types are also the argument types for the [useCropper](./hook-api.md) composable.

| Option     | Description                                                                 |
| :--------- | :-------------------------------------------------------------------------- |
| boxStyle   | Styles for the crop area container (the parent element that wraps Cropper)  |
| img        | Image URL used for cropping                                                 |
| options    | See [Cropper.js API](./cropperjs-api.md)                                    |
| events     | See [Cropper.js API](./cropperjs-api.md)                                    |
| presetMode | See [Preset mode](./preset-mode.md)                                         |

:::tip
Remote images involve [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS). The server must be configured accordingly; prefer local images to avoid issues.
:::

- Type declarations

```ts
import type { CSSProperties } from 'vue'

export interface VuePictureCropperProps {
  /**
   * URL of the image to be cropped
   */
  img: string

  /**
   * Styles for the crop box container
   */
  boxStyle?: CSSProperties

  /**
   * Cropper.js options; see Cropper.js documentation
   */
  options?: CropperInstance.Options

  /**
   * Preset mode; see [Preset mode](./preset-mode.md)
   */
  presetMode?: PresetModeOptions
}
```

## Common methods {#methods}

The component adds several convenience methods on top of Cropper.js. Use the `cropper` instance to call these and other plugin APIs.

- Type declarations

```ts
export interface CropperInstance extends Cropper {
  /**
   * Get the cropped result as Base64
   *
   * Suitable for local preview
   */
  getDataURL: (options?: CropperInstance.GetCroppedCanvasOptions) => string

  /**
   * Get the cropped result as Blob
   *
   * Suitable for sending to the server
   */
  getBlob: (
    options?: CropperInstance.GetCroppedCanvasOptions,
  ) => Promise<Blob | null>

  /**
   * Get the cropped result as File
   *
   * Suitable for sending to the server
   *
   * @since 0.2.0
   */
  getFile: (
    options?: CropperInstance.GetCroppedCanvasOptions,
  ) => Promise<File | null>
}
```

::: tip Notes

All three are built-in plugin methods. Output format follows the source image format. They only work with local images, not remote ones.

Cropper.js also provides two common methods you can call on the instance:

- Clear crop box: `clear()`
- Reset crop box: `reset()`

:::

- Parameter options

All three extended methods accept the same options to control the output.

| Property              | Type    | Description                                                                 | Default                                            |
| :-------------------- | :------ | :-------------------------------------------------------------------------- | :------------------------------------------------- |
| width                 | number  | Width of the cropped result                                                 | Size of the cropped region on the source image     |
| height                | number  | Height of the cropped result                                                | Size of the cropped region on the source image     |
| minWidth              | number  | Minimum width of the cropped result                                         | 0                                                  |
| minHeight             | number  | Minimum height of the cropped result                                        | 0                                                  |
| maxWidth              | number  | Maximum width of the cropped result                                         | Infinity                                           |
| maxHeight             | number  | Maximum height of the cropped result                                        | Infinity                                           |
| fillColor             | string  | Background color of the result (e.g. for PNG transparent areas)              | transparent                                        |
| imageSmoothingEnabled | boolean | Whether to smooth the cropped image                                         | true                                               |
| imageSmoothingQuality | string  | Smoothing quality: `low` / `medium` / `high`                                | low                                                |
| fileName              | string  | File name; only used by `getFile`. Optional.                                | `cropped-${timestamp}.${source extension}`         |

To change output format or work with remote images, use Cropper.js’s [getCroppedCanvas](./cropperjs-api.md).
