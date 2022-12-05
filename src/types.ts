/* eslint-disable no-unused-vars */

/**
 * Because cropperjs does not export instance types
 * So copied its type declaration to here
 * @source ./node_modules/cropperjs/types/index.d.ts
 */
declare namespace Cropperjs {
  export type Action =
    | 'crop'
    | 'move'
    | 'zoom'
    | 'e'
    | 's'
    | 'w'
    | 'n'
    | 'ne'
    | 'nw'
    | 'se'
    | 'sw'
    | 'all'
  export type DragMode = 'crop' | 'move' | 'none'
  export type ImageSmoothingQuality = 'low' | 'medium' | 'high'
  export type ViewMode = 0 | 1 | 2 | 3

  export interface Data {
    x: number
    y: number
    width: number
    height: number
    rotate: number
    scaleX: number
    scaleY: number
  }

  export interface ContainerData {
    width: number
    height: number
  }

  export interface ImageData {
    left: number
    top: number
    width: number
    height: number
    rotate: number
    scaleX: number
    scaleY: number
    naturalWidth: number
    naturalHeight: number
    aspectRatio: number
  }

  export interface CanvasData {
    left: number
    top: number
    width: number
    height: number
    naturalWidth: number
    naturalHeight: number
  }

  export interface CropBoxData {
    left: number
    top: number
    width: number
    height: number
  }

  export interface GetCroppedCanvasOptions {
    width?: number
    height?: number
    minWidth?: number
    minHeight?: number
    maxWidth?: number
    maxHeight?: number
    fillColor?: string
    imageSmoothingEnabled?: boolean
    imageSmoothingQuality?: ImageSmoothingQuality
  }

  export interface SetDataOptions {
    x?: number
    y?: number
    width?: number
    height?: number
    rotate?: number
    scaleX?: number
    scaleY?: number
  }

  export interface SetCanvasDataOptions {
    left?: number
    top?: number
    width?: number
    height?: number
  }

  export interface SetCropBoxDataOptions {
    left?: number
    top?: number
    width?: number
    height?: number
  }

  interface CropperEvent<T extends EventTarget = EventTarget>
    extends CustomEvent {
    currentTarget: T & { cropper: Cropper }
  }

  export type ReadyEvent<T extends EventTarget> = CropperEvent<T>

  export interface CropEvent<T extends EventTarget = EventTarget>
    extends CropperEvent<T> {
    detail: Data
  }

  export interface CropEventData {
    originalEvent: PointerEvent | TouchEvent | MouseEvent
    action: Action
  }

  export interface CropStartEvent<T extends EventTarget = EventTarget>
    extends CropperEvent<T> {
    detail: CropEventData
  }

  export interface CropMoveEvent<T extends EventTarget = EventTarget>
    extends CropperEvent<T> {
    detail: CropEventData
  }

  export interface CropEndEvent<T extends EventTarget = EventTarget>
    extends CropperEvent<T> {
    detail: CropEventData
  }

  export interface ZoomEventData {
    originalEvent: WheelEvent | PointerEvent | TouchEvent | MouseEvent
    oldRatio: number
    ratio: number
  }

  export interface ZoomEvent<T extends EventTarget = EventTarget>
    extends CropperEvent<T> {
    detail: ZoomEventData
  }

  export interface Options<T extends EventTarget = EventTarget> {
    aspectRatio?: number
    autoCrop?: boolean
    autoCropArea?: number
    background?: boolean
    center?: boolean
    checkCrossOrigin?: boolean
    checkOrientation?: boolean
    cropBoxMovable?: boolean
    cropBoxResizable?: boolean
    data?: SetDataOptions
    dragMode?: DragMode
    guides?: boolean
    highlight?: boolean
    initialAspectRatio?: number
    minCanvasHeight?: number
    minCanvasWidth?: number
    minContainerHeight?: number
    minContainerWidth?: number
    minCropBoxHeight?: number
    minCropBoxWidth?: number
    modal?: boolean
    movable?: boolean
    // eslint-disable-next-line no-undef
    preview?: HTMLElement | HTMLElement[] | NodeListOf<HTMLElement> | string
    responsive?: boolean
    restore?: boolean
    rotatable?: boolean
    scalable?: boolean
    toggleDragModeOnDblclick?: boolean
    viewMode?: ViewMode
    wheelZoomRatio?: number
    zoomOnTouch?: boolean
    zoomOnWheel?: boolean
    zoomable?: boolean
    ready?(event: ReadyEvent<T>): void
    crop?(event: CropEvent<T>): void
    cropend?(event: CropEndEvent<T>): void
    cropmove?(event: CropMoveEvent<T>): void
    cropstart?(event: CropStartEvent<T>): void
    zoom?(event: ZoomEvent<T>): void
  }
}

declare class Cropper {
  constructor(
    element: HTMLImageElement,
    options?: Cropperjs.Options<HTMLImageElement>
  )
  constructor(
    element: HTMLCanvasElement,
    options?: Cropperjs.Options<HTMLCanvasElement>
  )
  clear(): Cropper
  crop(): Cropper
  destroy(): Cropper
  disable(): Cropper
  enable(): Cropper
  getCanvasData(): Cropperjs.CanvasData
  getContainerData(): Cropperjs.ContainerData
  getCropBoxData(): Cropperjs.CropBoxData
  getCroppedCanvas(
    options?: Cropperjs.GetCroppedCanvasOptions
  ): HTMLCanvasElement
  getData(rounded?: boolean): Cropperjs.Data
  getImageData(): Cropperjs.ImageData
  move(offsetX: number, offsetY?: number): Cropper
  moveTo(x: number, y?: number): Cropper
  replace(url: string, onlyColorChanged?: boolean): Cropper
  reset(): Cropper
  rotate(degree: number): Cropper
  rotateTo(degree: number): Cropper
  scale(scaleX: number, scaleY?: number): Cropper
  scaleX(scaleX: number): Cropper
  scaleY(scaleY: number): Cropper
  setAspectRatio(aspectRatio: number): Cropper
  setCanvasData(data: Cropperjs.SetCanvasDataOptions): Cropper
  setCropBoxData(data: Cropperjs.SetCropBoxDataOptions): Cropper
  setData(data: Cropperjs.SetDataOptions): Cropper
  setDragMode(dragMode: Cropperjs.DragMode): Cropper
  zoom(ratio: number): Cropper
  zoomTo(ratio: number, pivot?: { x: number; y: number }): Cropper
  static noConflict(): Cropper
  static setDefaults(options: Cropperjs.Options<EventTarget>): void
}

/**
 * The Cropper instance provided with the component
 */
export interface CropperInstance extends Cropper {
  getDataURL: (options?: Record<string, any>) => string
  getBlob: (options?: Record<string, any>) => Promise<Blob | null>
  getFile: (options?: Record<string, any>) => Promise<File | null>
}

/**
 * Preset Modes Supported by Components
 */
export type SupportedPresetMode =
  // Specifies the size of the cropped result
  | 'fixedSize'
  // Generate a round cropping result
  | 'round'

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
 * Options to get image mime type
 */
export interface GetImgMIMETypeOptions {
  mode: SupportedPresetMode | undefined
  dataURI: string
}
