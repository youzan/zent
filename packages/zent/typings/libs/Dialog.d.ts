/// <reference types="react" />

declare module 'zent/lib/dialog' {

  namespace Dialog {

    export interface IProps {
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

    export interface IOpenOption extends IProps {
      dialogId: string
    }

    export interface ICloseOption {
      triggerOnClose: boolean
    }

    export function openDialog(option: Dialog.IOpenOption): (close: boolean) => void;

    export function closeDialog(dialogId: string, option?: Dialog.ICloseOption): void;

  }

  class Dialog extends React.Component<Dialog.IProps, any> { }

  export default Dialog;
}
