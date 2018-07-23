import { IPopProps } from "zent/lib/pop";

declare module 'zent/lib/pop-ellipsis-text' {
  interface IPopEllipsisTextProps {
    text: JSX.Element
    width?: number | string
    style?: React.CSSProperties
    count?: number
    className?: string
    popClassName?: string
    line?: number
  }
  export default class PopEllipsisText extends React.Component<IPopEllipsisTextProps & IPopProps, any> {}
}