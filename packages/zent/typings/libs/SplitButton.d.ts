/// <reference types="react" />

declare module 'zent/lib/splitButton' {
  interface ISplitButtonProps {
    type?: 'default' | 'primary' | 'danger' | 'success'
    size?: 'medium' | 'large' | 'small'
    disabled?: boolean
    loading?: boolean
    dropdownData?: Array<any>
    dropdownTrigger?: 'click' | 'hover'
    dropdownText?: string
    dropdownValue?: string
    className?: string
    prefix?: string
    onClick?: React.UIEventHandler<HTMLButtonElement>
    onSelect?: Function
  }

  export default class Button extends React.Component<IButtonProps, any> { }
}
