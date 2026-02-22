---
outline: deep
---

# Preset Mode

This plugin provides some commonly used preset modes for quick use in daily business scenarios.

## Notices

Before you start using it, you need to understand some limitations.

### Configuration behavior

1. **Crop area and crop result share the same size**  
   In preset mode, the crop area and crop result keep the same size.  
   If you specify `width` and `height` in `presetMode`, these values override the size arguments passed to APIs such as `getDataURL`.

2. **Aspect ratio**  
   Ensure the aspect ratio of `presetMode.width` and `presetMode.height` matches `options.aspectRatio`, otherwise the crop result may be stretched or cropped unexpectedly.

### Type constraints

1. **Mode value restriction**  
   `presetMode.mode` only accepts values defined in the `SupportedPresetMode` type; other values will not take effect.

2. **Simplified preset configuration**  
   Preset mode only provides basic configuration. You still need to pass the required `options` according to your needs. Refer to the source code in the [online examples](#online-examples).

## Online Examples

- [Fixed width and height crop mode](../examples/preset-fixed-size.md)
- [Round crop result](../examples/preset-round.md)

## Type Declarations

Control preset mode by passing the `presetMode` prop to the instance via `VuePictureCropper` or `useCropper`. The type definition of this prop is as follows.

```ts
/**
 * Preset modes supported by the component
 */
export type SupportedPresetMode =
  /**
   * Specify the size of the cropped result
   */
  | 'fixedSize'

  /**
   * Generate a round crop result
   */
  | 'round'

/**
 * Preset options on component props
 *
 * @since 0.4.0
 */
export interface PresetModeOptions {
  /**
   * The preset mode to use
   */
  mode?: SupportedPresetMode

  /**
   * Width of the crop result
   */
  width?: number

  /**
   * Height of the crop result
   */
  height?: number
}
```
