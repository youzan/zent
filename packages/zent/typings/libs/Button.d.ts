/// <reference types="react" />

declare module 'zent/lib/button' {

  namespace ButtonGroup {

    export interface IProps {
      className?: string
      prefix?: string
      style?: React.CSSProperties
    }

  }

  namespace Button {

    import Group = ButtonGroup;

    export interface IProps {
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
      onClick?: React.MouseEventHandler<HTMLButtonElement>
    }

    export {
      Group
    }

  }

  class Button extends React.Component<Button.IProps, any> { }

  class ButtonGroup extends React.PureComponent<ButtonGroup.IProps, any> { }

  export default Button;
}
