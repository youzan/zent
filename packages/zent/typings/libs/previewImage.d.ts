/// <reference types="react" />

declare module 'zent/lib/preview-image' {
  interface IPreviewImageConfig {
    images: Array<string>
    index?: number
    showRotateBtn?: boolean
    className?: string
    prefix?: string
  }

  export default function previewImage(config: IPreviewImageConfig): any
}
