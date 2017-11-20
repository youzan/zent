/// <reference types="react" />

declare module 'zent/lib/button' {
  interface IButtonProps {
    type?: 'default' | 'primary' | 'danger' | 'success'
    size?: 'medium' | 'large' | 'small'
    htmlType?: 'button' | 'submit' | 'reset'
    block?: boolean
    disabled?: boolean
    loading?: boolean
    outline?: boolean
    bordered?: boolean
    component?: (() => string) | string
    href?: string
    target?: string
    className?: string
    prefix?: string
    onClick?: React.UIEventHandler<HTMLButtonElement>
  }

  export default class Button extends React.Component<IButtonProps, any> { }
}
