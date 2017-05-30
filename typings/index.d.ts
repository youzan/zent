// TypeScript Version: 2.3

/// <reference types="react" />

declare namespace Zent {
  
  namespace Layout {
    interface IRowProps {
      className?: string
      prefix?: string
    }

    export class Row extends React.Component<IRowProps, any> {}

    interface IColProps {
      span: number
      offset?: number
      className?: string
      prefix?: string
    }
  }
  
  type TIconType = 'summary-o'|'summary'|'shop-o'|'shop'|'goods-o'|'goods'|'order-o'|'order'|'customer-o'|'customer'|'chart-o'|'chart'|'capital-o'|'capital'|'casher'|'marketing'|'settings-o'|'settings'|'youzan-o'|'youzan'|'close'|'close-circle-o'|'close-circle'|'message'|'message-o'|'bell'|'bell-o'|'calendar'|'calendar-o'|'search'|'customer-service'|'feedback'|'error-circle-o'|'error-circle'|'check-circle-o'|'check-circle'|'help-circle-o'|'help-circle'|'clock-o'|'clock'|'countdown'|'download'|'share'|'shop-decorate'|'shop-template'|'gift'|'caret-up'|'caret-down'|'arrow-up'|'arrow-down'|'right'|'plus'|'star-o'|'star'|'check'|'info-circle-o'|'info-circle'|'warning-o'|'warning'|'lock'|'unlock'

  interface IIconProps {
    type: TIconType
    className?: string
  }

  export class Icon extends React.Component<IIconProps, any> {}

  type TAlertType = 'info'|'warning'|'danger'
  type TAlertSize = 'normal'|'large'

  interface IAlertProps {
    type: TAlertType
    size?: TAlertSize
    rounded?: boolean
    closable?: boolean
    onClose?: () => void
    className?: string
    prefix?: string
  }

  export class Alert extends React.Component<IAlertProps, any> {}

  interface IDialogProps {
    title?: React.ReactNode
    children?: React.ReactNode
    footer?: React.ReactNode
    visible?: boolean
    closeBtn?: boolean
    onClose?: () => void
    mask?: boolean
    maskClosable?: boolean
    className?: string
    prefix?: string
    style?: React.CSSProperties
  }


}


