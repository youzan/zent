/// <reference types="react" />

declare module 'zent/lib/badge' {
  interface IBadgeProps {
    count?: number
    maxCount?: number
    dot?: boolean
    showZero?: boolean
    className?: string
    prefix?: string
  }

  export default class Badge extends React.Component<IBadgeProps, any> {}
}
