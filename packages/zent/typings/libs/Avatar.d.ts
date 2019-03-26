/// <reference types="react" />

declare module 'zent/lib/avatar' {
  interface IAvatarProps {
    shape?: 'circle' | 'square'
    size?: 'small' | 'default' | 'large' | number
    icon?: string
    src?: string
    children?: string
    bordered?: boolean
    style?: React.CSSProperties
    className?: string
    prefix?: string
  }

  export default class Avatar extends React.Component<IAvatarProps, any> {}
}
