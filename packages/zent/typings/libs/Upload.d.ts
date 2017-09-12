/// <reference types="react" />

declare module 'zent/lib/upload' {
  interface IUploadProps {
    prefix?: string
    className?: string
    triggerClassName?: string
    maxSize?: number
    maxAmount?: number
    accept?: string
    tips?: string
    localOnly?: boolean
    auto?: boolean
    fetchUrl?: string
    tokenUrl?: string
    uploadUrl?: string
    filterFiles?: Function
    onFetch?: Function
    onUpload?: Function
    triggerInline?: boolean
    silent?: boolean
    withoutPopup?: boolean
  }

  export default class Upload extends React.Component<IUploadProps, any> {}
}
