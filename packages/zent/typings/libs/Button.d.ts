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
    style?: React.CSSProperties
    prefix?: string
    onClick?: React.UIEventHandler<HTMLButtonElement>
  }

  interface IButtonGroupProps {
    className?: string
    prefix?: string
    style?: React.CSSProperties
  }

  class Button extends React.Component<IButtonProps, any> { }

  namespace Button {
    class Group extends React.PureComponent<IButtonGroupProps, any> {}
  }

  export default Button
}
