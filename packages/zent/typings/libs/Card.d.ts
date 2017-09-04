/// <reference types="react" />

declare module 'zent/lib/card' {
  interface ICardProps {
    title?: React.ReactNode,
    action?: React.ReactNode,
    style?: React.CSSProperties,
    bodyStyle?: React.CSSProperties,
    className?: string,
    prefix?: string
  }

  export default class Card extends React.Component<ICardProps, any> {}
}
