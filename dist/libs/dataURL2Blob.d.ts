declare const dataURL2Blob: (
  b64Data: string,
  contentType?: string,
  sliceSize?: number
) => Blob
export default dataURL2Blob
