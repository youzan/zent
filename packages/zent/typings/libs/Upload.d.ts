/// <reference types="react" />

declare module 'zent/lib/upload' {

  interface IErrorMessage {
    overMaxSize?: string | ((data: { maxSize: string, type: string }) => string)
    overMaxAmount?: string | ((data: { maxAmount: number, type: string }) => string)
    wrongMimeType?: string | ((data: { type: string }) => string)
  }

  interface ILocalFile {
    file: File
    src: string
    __uid: number
  }

  interface IUploadConfig {
    categoryId: number
    localFiles: ILocalFile[]
    onProgress: (progress: number, index: number) => void
  }

  interface IUploadProps {
    prefix?: string
    className?: string
    type?: 'image' | 'video'
    triggerClassName?: string
    maxSize?: number
    maxAmount?: number
    accept?: string
    tips?: string
    localOnly?: boolean
    auto?: boolean
    filterFiles?: (files: File[]) => File[] | Promise<File[]>
    onFetch?: (networkUrl: string, categoryId: number) => Promise<any>
    onUpload?: (localFiles: ILocalFile[], uploadConfig: IUploadConfig) => void | Promise<any>
    categoryList?: Array<{
      value: any,
      text: string|number
    }>
    categoryId?: number
    errorMessages?: IErrorMessage
    triggerInline?: boolean
    silent?: boolean
    withoutPopup?: boolean
  }

  export default class Upload extends React.Component<IUploadProps, any> {}
}
