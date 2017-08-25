/// <reference types="react" />

declare module 'zent/lib/sku' {
  interface ISKUItem {
    id: number
    text: string
  }

  interface ISKUProps {
    className?: string
    value?: Array<ISKUItem>
    disabled?: string|boolean
    maxSize?: number
    maxSKUTextLength?: number
    maxLeafTextLength?: number
    skuTree?: Array<ISKUItem>
    optionValue?: string
    optionText?: string
    onFetchGroup?: Function
    onFetchSKU?: Function
    onCreateGroup?: Function
    onCreateSKU?: Function
    onChange?: Function
    prefix?: string
  }

  export default class SKU extends React.Component<ISKUProps, any> {}
}
