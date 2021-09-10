import 'cropperjs/dist/cropper.css'
export declare let cropper: any
declare const VuePictureCropper: import('vue').DefineComponent<
  {
    boxStyle: {
      type: ObjectConstructor
      required: false
      default: () => {}
    }
    img: StringConstructor
    options: {
      type: ObjectConstructor
      required: false
      default: () => {}
    }
    presetMode: {
      type: ObjectConstructor
      required: false
      default: () => {}
    }
  },
  unknown,
  {
    cropper: any
    mimeType: string
  },
  {},
  {
    init(): Promise<void>
    usePresetMode(): void
    updateInstance(): void
    updateResultOptions(options?: { [key: string]: unknown }): {
      [key: string]: unknown
    }
    getImgSuffix(): void
    getDataURL(options?: { [key: string]: unknown }): string
    getBlob(options?: { [key: string]: unknown }): Promise<Blob | null>
    getFile(options?: { [key: string]: unknown }): Promise<File>
  },
  import('vue').ComponentOptionsMixin,
  import('vue').ComponentOptionsMixin,
  Record<string, any>,
  string,
  import('vue').VNodeProps &
    import('vue').AllowedComponentProps &
    import('vue').ComponentCustomProps,
  Readonly<
    {
      boxStyle?: unknown
      img?: unknown
      options?: unknown
      presetMode?: unknown
    } & {
      boxStyle: Record<string, any>
      options: Record<string, any>
      presetMode: Record<string, any>
    } & {
      img?: string
    }
  >,
  {
    boxStyle: Record<string, any>
    options: Record<string, any>
    presetMode: Record<string, any>
  }
>
export default VuePictureCropper
