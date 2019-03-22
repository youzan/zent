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
    onFetchGroup?: () => Promise<any>
    onFetchSKU?: (id) => Promise<any>
    onCreateGroup?: (text) => Promise<any>
    onCreateSKU?: (value: { id: number; text: string }) => Promise<any>
    onChange?: Function
    prefix?: string
  }

  class SKU extends React.Component<ISKUProps, any> {
    static flatten(sku: Array<any>, items: Array<any>, options: {
      optionValue: string
      optionText: string
    }): Array<any>
  }

  export default SKU
}
