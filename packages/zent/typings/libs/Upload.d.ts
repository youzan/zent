/// <reference types="react" />

declare module 'zent/lib/upload' {

  interface ErrorMessage {
    overMaxSize?: string | Function
    overMaxAmount?: string | Function
    wrongMimeType?: string | Function
  }

  interface IUploadProps {
    prefix?: string
    className?: string
    type?: 'image' | 'video'
    triggerClassName?: string
    maxSize?: number
    maxAmount?: number
    accept?: 'image/gif' | 'image/jpeg' | 'image/png' | 'image/bmp'
    tips?: string
    localOnly?: boolean
    auto?: boolean
    filterFiles?: Function
    onFetch?: Function
    onUpload?: Function
    onProgress?: Function
    categoryList?: Array<{
      value: any,
      text: string|number
    }>
    categoryId?: number
    errorMessages?: ErrorMessage
    triggerInline?: boolean
    silent?: boolean
    withoutPopup?: boolean
  }

  export default class Upload extends React.Component<IUploadProps, any> {}
}
