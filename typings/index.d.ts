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

  interface IOpenDialogOption extends IDialogProps {
    dialogId: string
  }

  interface ICloseDialogOption {
    triggerOnClose: boolean
  }

  class Dialog extends React.Component<IDialogProps, any> {
    static openDialog(option: IOpenDialogOption): (close: boolean) => void
    static closeDialog(dialogId: string, option: ICloseDialogOption): void
  }

  interface ILoadingProps {
    show?: boolean
    static?: boolean
    height?: number
    zIndex?: number
    className?: string
    containerClass?: string
    prefix?: string
  }

  class Loading extends React.Component<ILoadingProps, any> {
    static on(): void
    static off(): void
  }

  interface INotifyProps {
    text?: any
    duration?: number
    callback?: () => void
  }

  class Notify extends React.Component<INotifyProps, any> {
    static success(): number
    static error(): number
    static clear(id: number): void
  }

  interface IPopProps {
    content: React.ReactNode
    trigger?: 'none'|'click'|'hover'|'focus'
    position?: string
    centerArrow?: boolean
    header: React.ReactNode
    block?: boolean
    onShow?: () => void
    onClose?: () => void
    onBeforeShow?: () => void
    onBeforeClose?: () => void
    onConfirm?: () => void
    onCancel?: () => void
    confirmText?: string
    cancelText?: string
    type?: 'primary'|'default'|'danger'|'success'
    visible?: boolean
    onVisibleChange?: () => void
    className?: string
    wrapperClassName?: string
    prefix?: string
    closeOnClickOutside?: boolean
    isOutside?: (target: HTMLElement, node: { contentNode: HTMLElement, triggerNode: HTMLElement }) => boolean
    mouseEnterDelay?: number
    mouseLeaveDelay?: number
  }

  class Pop extends React.Component<IPopProps, any> {}

  namespace SweetAlert {
    interface IAlertOption {
      content: React.ReactNode
      type: 'info'|'success'|'error'|'warning'
      title?: React.ReactNode
      onConfirm?: () => void|Promise<any>
      confirmText?: string
      confirmType?: 'default'|'primary'|'danger'|'success'
      className?: string
      prefix?: string
    }

    interface IConfirmOption extends IAlertOption {
      onCancel?: () => void
      cancelText?: string
    }

    function alert(option: IAlertOption): () => void
    function confirm(option: IConfirmOption): () => void
  }

  interface IButtonProps {
    type?: 'default'|'primary'|'danger'|'success'
    size?: 'medium'|'large'|'small'
    htmlType?: 'button'|'submit'|'reset'
    block?: boolean
    disabled?: boolean
    loading?: boolean
    outline?: boolean
    bordered?: boolean
    component?: (() => string)|string
    href?: string
    target?: string
    className?: string
    prefix?: string
  }

  class Button extends React.Component<IButtonProps, any> {}

  interface ICheckBoxProps {
    checked?: boolean
    value?: any
    disabled?: boolean
    indeterminate?: boolean
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    className?: string
    prefix?: string
  }

  interface ICheckBoxGroupProps {
    value: Array<any>
    isValueEqual?: (value1: any, value2: any) => boolean
    disabled?: boolean
    onChange?: (values: Array<any>) => void
    className?: string
    prefix?: string
  }

  class CheckBox extends React.Component<ICheckBoxProps, any> {}

  namespace CheckBox {
    class Group extends React.Component<ICheckBoxGroupProps, any> {}
  }

  
}


