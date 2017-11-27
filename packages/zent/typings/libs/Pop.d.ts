/// <reference types="react" />

declare module 'zent/lib/pop' {
  interface IPopProps {
    content?: React.ReactNode
    trigger?: 'none' | 'click' | 'hover' | 'focus'
    position?: string
    centerArrow?: boolean
    header?: React.ReactNode
    block?: boolean
    onShow?: Function
    onClose?: Function
    onBeforeShow?: Function
    onBeforeClose?: Function
    onConfirm?: Function
    onCancel?: Function
    confirmText?: string
    cancelText?: string
    type?: 'primary' | 'default' | 'danger' | 'success'
    visible?: boolean
    onVisibleChange?: Function
    className?: string
    wrapperClassName?: string
    prefix?: string
    closeOnClickOutside?: boolean
    isOutside?: (target: HTMLElement, node: { contentNode: HTMLElement, triggerNode: HTMLElement }) => boolean
    mouseEnterDelay?: number
    mouseLeaveDelay?: number
  }

  export default class Pop extends React.Component<IPopProps, any> { }
}
