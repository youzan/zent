/// <reference types="react" />

declare module 'zent/lib/dialog' {
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

  export default class Dialog extends React.Component<IDialogProps, any> {
    static openDialog(option: IOpenDialogOption): (close: boolean) => void
    static closeDialog(dialogId: string, option: ICloseDialogOption): void
  }
}
