import { type Cropper } from './library'

/**
 * Augment HTMLElementEventMap so that addEventListener('crop', ...) etc. get
 * the correct event type when used on the cropper's element.
 *
 * @example
 *   el.addEventListener('crop', (e) => {
 *     e.detail // Cropper.Data
 *     e.currentTarget?.cropper
 *   })
 */
declare global {
  interface HTMLElementEventMap {
    ready: Cropper.ReadyEvent<HTMLImageElement>
    crop: Cropper.CropEvent<HTMLImageElement>
    cropend: Cropper.CropEndEvent<HTMLImageElement>
    cropmove: Cropper.CropMoveEvent<HTMLImageElement>
    cropstart: Cropper.CropStartEvent<HTMLImageElement>
    zoom: Cropper.ZoomEvent<HTMLImageElement>
  }
}

export {}
