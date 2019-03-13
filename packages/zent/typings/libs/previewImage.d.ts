/// <reference types="react" />

declare module 'zent/lib/preview-image' {
  interface IPreviewImageConfig {
    images: Array<string>;
    index?: number;
    showRotateBtn?: boolean;
    scaleRatio?: number;
    parentComponent?: React.ReactInstance;
    className?: string;
    prefix?: string;
  }

  export default function previewImage(config: IPreviewImageConfig): void;
}
