/// <reference types="react" />

declare module 'zent/lib/split-button' {
  interface ISplitButtonProps {
    type?: 'default' | 'primary' | 'danger' | 'success'
    size?: 'medium' | 'large' | 'small'
    disabled?: boolean
    loading?: boolean
    dropdownData?: Array<any>
    dropdownTrigger?: 'click' | 'hover'
    dropdownText?: string
    dropdownValue?: string
    droopdownPosition?: 'left-top' | 'left-center' | 'left-bottom' | 'right-top' | 'right-center' | 'right-bottom' | 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' | 'auto-bottom-center' | 'auto-bottom-left' | 'auto-bottom-right' | 'auto-top-center' | 'auto-top-left' | 'auto-top-right'
    className?: string
    prefix?: string
    onClick?: React.UIEventHandler<HTMLButtonElement>
    onSelect?: Function
  }

  export default class SplitButton extends React.Component<ISplitButtonProps, any> { }
}
