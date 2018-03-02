/// <reference types="react" />

declare module 'zent/lib/sweetalert' {
  namespace Sweetalert {
    interface IAlertOption {
      content: React.ReactNode
      type: 'info' | 'success' | 'error' | 'warning'
      title?: React.ReactNode
      onConfirm?: () => void | Promise<any>
      confirmText?: string
      confirmType?: 'default' | 'primary' | 'danger' | 'success'
      closeBtn?: boolean
      maskClosable?: boolean
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

  export default Sweetalert
}
