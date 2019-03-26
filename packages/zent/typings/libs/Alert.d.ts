/// <reference types="react" />

declare module 'zent/lib/alert' {
  interface IAlertProps {
    type: 'info' | 'warning' | 'danger'
    size?: 'normal' | 'large'
    rounded?: boolean
    closable?: boolean
    onClose?: () => void
    className?: string
    prefix?: string
  }
  
  export default class Alert extends React.Component<IAlertProps, any> { }
}


