/// <reference types="react" />

declare module 'zent/lib/switch' {
  interface ISwitchProps {
    checked?: boolean
    onChange?: (checked: boolean) => void
    disabled?: boolean
    checkedText?: string
    uncheckedText?: string
    loading?: boolean
    size?: 'default' | 'small'
    className?: string
    prefix?: string
  }

  export default class Switch extends React.Component<ISwitchProps, any> { }
}
